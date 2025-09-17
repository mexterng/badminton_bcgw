const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const offset = Number(helper.getOffset(page, config.listPerPage));
  const limit = Number(config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM member LIMIT ${offset},${limit}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}

async function create(member) {

  let allowedColumns = [
    "display_name",
    "first_name",
    "last_name",
    "gender",
    "age_division_id"
  ]

  // Build SQL dynamically
  const columns = allowedColumns.filter(col => member[col] !== undefined);
  const values = columns.map(col => member[col]);

  // Build SQL dynamically
  const sql = `
    INSERT INTO member (${columns.join(", ")})
    VALUES (${columns.map(() => "?").join(", ")})
  `;

  const result = await db.query(sql, values);

  let message = "Error in creating member";
  let id = null;

  if (result.insertId) {
    message = "Member created successfully";
    id = result.insertId.toString();
  }

  return { id, message };
}

async function update(id, member) {
  let allowedColumns = [
    "display_name",
    "first_name",
    "last_name",
    "gender",
    "age_division_id"
  ]

  // Build SQL dynamically
  const columns = allowedColumns.filter(col => member[col] !== undefined);
  const values = columns.map(col => member[col]);

  // Build SQL dynamically
  const setClause = columns.map(col => `${col} = ?`).join(", ");

  // Add id for WHERE clause
  values.push(id);

  const sql = `
    UPDATE member
    SET ${setClause}
    WHERE member_id = ?
  `;

  const result = await db.query(sql, values);

  let message = "Error in updating member";

  if (result.affectedRows) {
    message = "Member updated successfully";
  }

  return { message };
}

async function getSingle(id) {
  const rows = await db.query(
    `SELECT * FROM member WHERE member_id = ? LIMIT 1`,
    [id]
  );
  const data = helper.emptyOrRows(rows);
  return data[0] || null;
}

module.exports = {
  getMultiple,
  getSingle,
  create,
  update,
};