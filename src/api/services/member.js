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
  const sql = `
    INSERT INTO member 
    (display_name, first_name, last_name, gender, age_division_id)
    VALUES (?, ?, ?, ?, ?)
  `;
  const result = await db.query(sql, [
    member.display_name,
    member.first_name,
    member.last_name,
    member.gender,
    member.age_division_id,
  ]);

  let message = "Error in creating member";

  if (result.affectedRows) {
    message = "Member created successfully";
  }

  let id = result.insertId.toString();
  // return the id of the created record

  return { id, message };
}

async function update(id, member) {
  const sql = `
    UPDATE member 
    SET display_name = ?, first_name = ?, last_name = ?, gender = ?, age_division_id = ? 
    WHERE member_id = ?
  `;
  const result = await db.query(sql, [
    member.display_name,
    member.first_name,
    member.last_name,
    member.gender,
    member.age_division_id,
    id,
  ]);

  let message = "Error in updating member";

  if (result.affectedRows) {
    message = "member updated successfully";
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