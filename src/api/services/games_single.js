const db = require("./db");
const helper = require("../helper");
const games = require("./games");
const pyramides = require("./pyramides")
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = Number(helper.getOffset(page, config.listPerPage));
  const limit = Number(config.listPerPage);
  const rows = await db.query(
    `SELECT game_id_singles, player_a, player_b, winner_id FROM games_single LIMIT ${offset},${limit}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getSingle(id) {
  const rows = await db.query(
    `SELECT * FROM games_single WHERE game_id_singles = ? LIMIT 1`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return data[0] || null;
}

async function create(single_game) {
  const connection = await db.getConnection(); // connection for transaction
  await connection.beginTransaction();

  try {
    // calculate important infos
    const loser_id = single_game.winner_id === single_game.player_a 
        ? single_game.player_b 
        : single_game.player_a;

    const winnerOldPlacement = await games.getPlacement(
      "pyramid_single", 
      single_game.winner_id, 
      single_game.age_division, 
      connection
    );

    const loserOldPlacement = await games.getPlacement(
      "pyramid_single", 
      loser_id, 
      single_game.age_division, 
      connection
    );

    single_game.valid = helper.is_challenge_valid(
        winnerOldPlacement, 
        loserOldPlacement
    );

    // Define allowed columns
    const allowedColumns = [
        "player_a",
        "player_b",
        "age_division",
        "timestamp",
        "set_one",
        "set_two",
        "set_three",
        "winner_id",
        "valid"
    ];

    // Filter only present attributes
    const columns = allowedColumns.filter(col => single_game[col] !== undefined);
    const values = columns.map(col => single_game[col]);

    // 1. Insert game into games_single
    // Build SQL dynamically
    const sqlGamesSingle = `
        INSERT INTO games_single (${columns.join(", ")})
        VALUES (${columns.map(() => "?").join(", ")})
    `;
    const [rows] = await connection.execute(sqlGamesSingle, values);
    const data = helper.emptyOrRows(rows)
    const gameId = data.insertId;

    let message = "Error in creating singles game";
    let gameIdStr = null;

    if (gameId) {
      message = "Singles game created successfully.";
      gameIdStr = gameId.toString();
    }
    console.log("valid: " + single_game.valid);
    // 2. Update pyramid
    if (single_game.valid && winnerOldPlacement > loserOldPlacement) {
      // Get timestamp
      const [rows] = await connection.execute(
        `SELECT timestamp FROM games_single WHERE game_id_singles = ?`,
        [gameId]
      );
      const data = helper.emptyOrRows(rows)
      const timestamp = data[0].timestamp;

      const sqlPyramidSingle = `
      INSERT INTO pyramid_single (
        member_id,
        placement,
        timestamp,
        age_division_id
        )
        VALUES (?, ?, ?, ?)
      `;
      
      // Must be called before inserts into pyramid table in order to retrieve the old ranking.
      const oldRanking = await pyramides.getRanking("pyramid_single", single_game.age_division, connection);
      console.log(oldRanking);
      // Shift loser AND all players in between +1
      console.log(Math.min(winnerOldPlacement - 1, oldRanking.length));
      for (let idx = loserOldPlacement - 1; idx < Math.min(winnerOldPlacement - 1, oldRanking.length); idx++){
        await connection.execute(sqlPyramidSingle, [
          oldRanking[idx], // id
          idx + 2, // new placement (+1 array offset)
          timestamp,
          single_game.age_division,
        ]);
      }
              
      // Winner moves to loser's place
      await connection.execute(sqlPyramidSingle, [
        single_game.winner_id,
        loserOldPlacement,
        timestamp,
        single_game.age_division,
      ]);
    }

    await connection.commit();
    return { message: message, game_id: gameIdStr, valid: single_game.valid };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    await connection.end();
  }
}

async function update(id, single_game) {
  // Define allowed columns
  const allowedColumns = [
    "player_a",
    "player_b",
    "age_division",
    "timestamp",
    "set_one",
    "set_two",
    "set_three",
    "winner_id"
  ];

  // Filter only present attributes
  const columns = allowedColumns.filter(col => single_game[col] !== undefined);
  const values = columns.map(col => single_game[col]);

  // Build SQL dynamically
  const setClause = columns.map(col => `${col} = ?`).join(", ");

  // Add id for WHERE clause
  values.push(id);

  const sql = `
    UPDATE games_single
    SET ${setClause}
    WHERE game_id_singles = ?
  `;

  const result = await db.query(sql, values);
  let message = "Error in updating game";

  if (result.affectedRows) {
    message = "Game updated successfully";
  }

  return { message };
}

async function remove(id) {
  const sql = `
    DELETE FROM games_single
    WHERE game_id_singles = ?
  `;
  const result = await db.query(sql, [id]);

  let message = "Error in deleting game";

  if (result.affectedRows) {
    // TODO: success even when id does not exist
    message = "Game deleted successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
  remove,
}