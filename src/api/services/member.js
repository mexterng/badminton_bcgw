const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1, getAll = false) {
  let rows;
  if (getAll) {
      rows = await db.query(
        'SELECT * FROM member ORDER BY display_name ASC'
      );
  } else {
    const offset = Number(helper.getOffset(page, config.listPerPage));
    rows = await db.query(
      `SELECT * FROM member ORDER BY display_name ASC LIMIT ${offset},${config.listPerPage}`
    );
  }
  const data = helper.emptyOrRows(rows);
  const meta = {page, getAll};

  return {
    data,
    meta,
  };
}

async function getMultipleByAgeDivision(age_division_id, page = 1, getAll = false) {
  let rows;
  const ageDivisionValue = age_division_id;
  if (getAll) {
      const sqlQuery = `
          SELECT * 
          FROM member
          WHERE JSON_CONTAINS(age_division, CAST(? AS JSON), '$')
          ORDER BY display_name ASC
      `;
      rows = await db.query(sqlQuery, [ageDivisionValue]);
  } else {
    const offset = Number(helper.getOffset(page, config.listPerPage));
    const sqlQuery = `
          SELECT * 
          FROM member 
          WHERE JSON_CONTAINS(age_division, CAST(? AS JSON), '$')
          ORDER BY display_name ASC 
          LIMIT ${offset}, ${config.listPerPage}
    `;
    rows = await db.query(sqlQuery, [ageDivisionValue]);
  }

  const data = helper.emptyOrRows(rows);
  const meta = {page, getAll};

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
    "age_division"
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
    "age_division"
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
  getMultipleByAgeDivision,
  getSingle,
  create,
  update,
};