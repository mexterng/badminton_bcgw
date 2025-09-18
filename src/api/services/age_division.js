const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM age_division LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getSingle(id) {
  const rows = await db.query(
    `SELECT * FROM age_division WHERE age_division_id = ?`, 
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return data[0] || null;
}

module.exports = {
  getMultiple,
  getSingle
}