const db = require("./db");
const helper = require("../helper");
const games = require("./games_helper");
const config = require("../config");

const games_table = "games_single";
const pyramid_table = "pyramid_single";

async function getMultiple(page = 1) {
  return await games.getMultiple(games_table, page)
}

async function getSingle(id) {
  return await games.getSingle(id, games_table);
}

async function getGamesOfMember(member_id) {
  const sqlSelect = `
    SELECT g.*, 
          ad.description AS age_division_description,
          mA.display_name AS player_a_display_name,
          mB.display_name AS player_b_display_name
    FROM games_single g
    LEFT JOIN age_division ad ON g.age_division = ad.age_division_id
    LEFT JOIN member mA ON g.player_a = mA.member_id
    LEFT JOIN member mB ON g.player_b = mB.member_id
    WHERE g.player_a = ? OR g.player_b = ?
  `;

  const rows = await db.query(sqlSelect, [member_id, member_id]);
  const data = helper.emptyOrRows(rows);

  return data.map(row => {
    const host = (member_id === row.player_a);

    const names = games.buildDisplayNames(
      host,
      row.player_a_display_name,
      row.player_b_display_name
    );

    return {
      game_id: row.game_id,
      age_division: row.age_division,
      timestamp: row.timestamp,
      valid: row.valid,
      host_display_name: names.host_display_name,
      opponent_display_name: names.opponent_display_name,
      result: games.computeResult(row, host),
      play_type_db: "games_single"
    };
  });
}

async function getGamesOfAgeDivision(age_division, page = 1, getAll = false) {
  let sqlQuery = `
    SELECT g.*, 
          ad.description AS age_division_description,
          mA.display_name AS player_a_display_name,
          mB.display_name AS player_b_display_name
    FROM games_single g
    LEFT JOIN age_division ad ON g.age_division = ad.age_division_id
    LEFT JOIN member mA ON g.player_a = mA.member_id
    LEFT JOIN member mB ON g.player_b = mB.member_id
    WHERE g.age_division = ?
  `;
  if (getAll) {
    page = -1;
  } else {
    const offset = Number(helper.getOffset(page, config.listPerPage));
    sqlQuery += ` LIMIT ${offset},${config.listPerPage}`;
  }
  const rows = await db.query(sqlQuery, [age_division]);
  let data = helper.emptyOrRows(rows);
  const meta = { page };


  data = data.map(row => {
    const names = games.buildDisplayNames(
      true,
      row.player_a_display_name,
      row.player_b_display_name
    );

    return {
      game_id: row.game_id,
      age_division: row.age_division,
      age_division_initial: row.age_division_description?.[0] ?? '',
      timestamp: row.timestamp,
      valid: row.valid,
      host_display_name: names.host_display_name,
      opponent_display_name: names.opponent_display_name,
      result: games.computeResult(row, true),
      play_type_db: "games_single"
    };
  });
  return {
    data,
    meta,
  };
}

async function create(singleGame) {
  return await games.create(singleGame, games_table, pyramid_table);
}

async function update(id, singleGame) {
  return await games.update(id, singleGame, games_table)
}

async function remove(id) {
  return await games.remove(id, games_table);
}

module.exports = {
  getMultiple,
  getSingle,
  getGamesOfMember,
  getGamesOfAgeDivision,
  create,
  update,
  remove,
}