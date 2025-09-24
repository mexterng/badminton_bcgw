const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = Number(helper.getOffset(page, config.listPerPage));
  const limit = Number(config.listPerPage);
  const rows = await db.query(
    `SELECT game_id, player_a, player_b, winner_id FROM games_double LIMIT ${offset},${limit}`
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
    `SELECT * FROM games_double WHERE game_id = ? LIMIT 1`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return data[0] || null;
}

async function create(doubles_game) {
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
  const columns = allowedColumns.filter(col => doubles_game[col] !== undefined);
  const values = columns.map(col => doubles_game[col]);

   // Build SQL dynamically
  const sql = `
    INSERT INTO games_double (${columns.join(", ")})
    VALUES (${columns.map(() => "?").join(", ")})
  `;

  const result = await db.query(sql, values);

  let message = "Error in creating doubles game";
  let id = null;

  if (result.insertId) {
    message = "Doubles game created successfully";
    id = result.insertId.toString();
  }

  return { id, message };
}

async function update(id, doubles_game) {
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
  const columns = allowedColumns.filter(col => doubles_game[col] !== undefined);
  const values = columns.map(col => doubles_game[col]);

   // Build SQL dynamically
  const setClause = columns.map(col => `${col} = ?`).join(", ");

  // Add id for WHERE clause
  values.push(id);

  const sql = `
    UPDATE games_double
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

async function remove(id) {
  const sql = `
    DELETE FROM games_double
    WHERE game_id = ?
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