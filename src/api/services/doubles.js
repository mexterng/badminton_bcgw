const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = Number(helper.getOffset(page, config.listPerPage));
  const limit = Number(config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM doubles LIMIT ${offset},${limit}`
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
    `SELECT * FROM doubles WHERE doubles_id = ? LIMIT 1`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return data[0] || null;
}

async function create(double) {
  const sql = `
    INSERT INTO doubles 
    (player_a, player_b)
    VALUES (?, ?)
  `;
  const result = await db.query(sql, [
    double.player_a,
    double.player_b,
  ]);

  let message = "Error in creating double";

  if (result.affectedRows) {
    message = "Double created successfully";
  }
  const id = result.insertId.toString();
  // return the id of the created record
  return { id, message };
}

module.exports = {
  getMultiple,
  getSingle,
  create,
};



