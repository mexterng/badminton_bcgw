const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT * FROM member LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(member){
  const result = await db.query(
    `INSERT INTO member 
    (display_name, first_name, last_name, gender, age_division_id) 
    VALUES 
    ('${member.display_name}', ${member.first_name}, ${member.last_name}, ${member.gender}, ${member.age_division_id})`
  );

  let message = 'Error in creating member';

  if (result.affectedRows) {
    message = 'Member created successfully';
  }

  return {message};
}

async function update(id, member){
  const result = await db.query(
    `UPDATE programming_languages 
    SET display_name="${member.display_name}", first_name=${member.first_name}, last_name=${member.last_name}, 
    gender=${member.gender}, age_division_id=${member.age_division_id} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating member';

  if (result.affectedRows) {
    message = 'member updated successfully';
  }

  return {message};
}

module.exports = {
  getMultiple,
  create,
  update
}