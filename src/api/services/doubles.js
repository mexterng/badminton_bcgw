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

async function getOrCreateByPlayers(playerA, playerB) {
  // check if the combination exists (order independent)
  const sqlSelect = `
    SELECT * FROM doubles
    WHERE (player_a = ? AND player_b = ?) OR (player_a = ? AND player_b = ?)
    LIMIT 1
  `;
  const rows = await db.query(sqlSelect, [playerA, playerB, playerB, playerA]);
  
  if (rows.length > 0) {
    return {
      id: rows[0].doubles_id,
      player_a: rows[0].player_a,
      player_b: rows[0].player_b,
      message: "Double exists"
    };
  }

  // if not found, insert new double
  const sqlInsert = `
    INSERT INTO doubles (player_a, player_b)
    VALUES (?, ?)
  `;
  const result = await db.query(sqlInsert, [playerA, playerB]);
  
  return { 
    id: result.insertId,
    player_a: playerA,
    player_b: playerB,
    message: "Double created successfully" 
  };
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  getOrCreateByPlayers,
};



