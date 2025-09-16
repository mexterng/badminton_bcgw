const db = require("./db");
const helper = require("../helper");
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

// TODO: missing: what if timestamp is given ... ? => in database: default is current timestamp
async function create(single_game) {
  const sql = `
    INSERT INTO games_single 
    (player_a, player_b, age_division, set_one, set_two, set_three, winner_id)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    single_game.player_a,
    single_game.player_b,
    single_game.age_division,
    single_game.set_one,
    single_game.set_two,
    single_game.set_three,
    single_game.winner_id, // could also be calculated here or in backend
  ]);

  let message = "Error in creating single game";

  if (result.affectedRows) {
    message = "Single game created successfully";
  }
  const id = result.insertId.toString();
  // return the id of the created record
  return { id, message };
}

async function update(id, single_game) {
  const sql = `
    UPDATE games_single 
    SET player_a = ?, player_b = ?, age_division = ?, set_one = ?, set_two = ?, set_three = ?, winner_id = ? 
    WHERE game_id_singles = ?
  `;
  const result = await db.query(sql, [
    single_game.player_a,
    single_game.player_b,
    single_game.age_division,
    single_game.set_one,
    single_game.set_two,
    single_game.set_three,
    single_game.winner_id,
    id,
]);

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