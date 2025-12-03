const db = require("./db");
const helper = require("../helper");
const pyramides = require("./pyramides")

async function getPlacement(table, id, age_division, connection = null){
    const sqlQuery = `
        SELECT placement 
        FROM ${table} 
        WHERE player_id = ? AND age_division_id = ? 
        ORDER BY timestamp DESC 
        LIMIT 1
    `;

    let rows = null;
    if (connection){
        [rows] = await connection.execute(sqlQuery, [id, age_division]);
    }
    else{
        rows = await db.query(sqlQuery, [id, age_division]);
    }
    const data = helper.emptyOrRows(rows);
    return data.length ? data[0].placement : Infinity;
}

async function getMultiple(gamesTable, page = 1) {
  const offset = Number(helper.getOffset(page, config.listPerPage));
  const limit = Number(config.listPerPage);
  const rows = await db.query(
    `SELECT game_id, player_a, player_b, winner_id FROM ${gamesTable} LIMIT ${offset},${limit}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function getSingle(id, gamesTable) {
  const rows = await db.query(
    `SELECT * FROM ${gamesTable} WHERE game_id = ? LIMIT 1`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return data[0] || null;
}

async function create(game, gamesTable, pyramidTable) {
  const connection = await db.getConnection(); // connection for transaction
  await connection.beginTransaction();

  try {
    // calculate important infos
    const loser_id = game.winner_id === game.player_a ? game.player_b : game.player_a;

    const winnerOldPlacement = await getPlacement(pyramidTable, game.winner_id, game.age_division, connection);

    const loserOldPlacement = await getPlacement(pyramidTable, loser_id, game.age_division, connection);

    game.valid = helper.is_challenge_valid(winnerOldPlacement, loserOldPlacement);

    // Define allowed columns
    const allowedColumns = ["player_a", "player_b", "age_division", "timestamp", "set_one", "set_two", "set_three", "winner_id", "valid"];

    // Filter only present attributes
    const columns = allowedColumns.filter(col => game[col] !== undefined);
    const values = columns.map(col => game[col]);

    // 1. Insert game into games_single
    // Build SQL dynamically
    const sqlGames = `
      INSERT INTO ${gamesTable} (${columns.join(", ")})
      VALUES (${columns.map(() => "?").join(", ")})
    `;
    const [rows] = await connection.execute(sqlGames, values);
    const gameId = rows.insertId;

    // 2. Update pyramid
    if (game.valid && winnerOldPlacement > loserOldPlacement) {
      // Get timestamp
      const [rows] = await connection.execute(
        `SELECT timestamp FROM ${gamesTable} WHERE game_id = ?`,
        [gameId]
      );
      const timestamp = rows[0].timestamp;

      // Must be called before inserts into pyramid table in order to retrieve the old ranking.
      const oldRanking = await pyramides.getRanking(pyramidTable, game.age_division, connection);
      
      // Shift loser AND all players in between +1
      for (let idx = loserOldPlacement - 1; idx < Math.min(winnerOldPlacement - 1, oldRanking.length); idx++){
        await pyramides.create(
          oldRanking[idx], // id
          idx + 2, // new placement (+1 array offset)
          timestamp,
          game.age_division,
          pyramidTable,
          connection
        );
      }
              
      // Winner moves to loser's place
      await pyramides.create(
        game.winner_id,
        loserOldPlacement,
        timestamp,
        game.age_division,
        pyramidTable,
        connection
      );
    }

    await connection.commit();
    return { message: "Game created successfully.", game_id: gameId.toString(), valid: game.valid };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    await connection.end();
  }
}

async function update(id, game, gamesTable) {
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
  const columns = allowedColumns.filter(col => game[col] !== undefined);
  const values = columns.map(col => game[col]);

  // Build SQL dynamically
  const setClause = columns.map(col => `${col} = ?`).join(", ");

  // Add id for WHERE clause
  values.push(id);

  const sql = `
    UPDATE ´${gamesTable}
    SET ${setClause}
    WHERE game_id = ?
  `;

  const result = await db.query(sql, values);
  let message = "Error in updating game";

  if (result.affectedRows) {
    message = "Game updated successfully";
  }

  return { message };
}

async function remove(id, gamesTable) {
  const sql = `
    DELETE FROM ${gamesTable}
    WHERE game_id = ?
  `;
  const result = await db.query(sql, [id]);

  let message = "Error in deleting game";

  if (result.affectedRows) {
    // TODO: success even when id does not exist
    message = "Game deleted successfully";
  }

  return { message };
}

// helper
// compare one set string "21-14"
function compareSet(setStr) {
  if (!setStr) return [0, 0];

  const parts = setStr.split("-").map(Number);
  if (parts.length !== 2 || parts.some(isNaN)) return [0, 0];

  const [scoreA, scoreB] = parts;

  if (scoreA > scoreB) return [1, 0];
  if (scoreB > scoreA) return [0, 1];
  return [0, 0]; // equal
}

// compute total result of sets and flip when needed
function computeResult(row, host) {
  let pointsA = 0;
  let pointsB = 0;

  [row.set_one, row.set_two, row.set_three].forEach(set => {
    const [pA, pB] = compareSet(set);
    pointsA += pA;
    pointsB += pB;
  });

  return host ? `${pointsA}:${pointsB}` : `${pointsB}:${pointsA}`;
}

// build host/opponent display names for single AND double
function buildDisplayNames(host, aName, bName) {
  return host
    ? { host_display_name: aName, opponent_display_name: bName }
    : { host_display_name: bName, opponent_display_name: aName };
}

module.exports = {
  getPlacement,
  getMultiple,
  getSingle,
  create,
  update,
  remove,
  computeResult,
  buildDisplayNames
}