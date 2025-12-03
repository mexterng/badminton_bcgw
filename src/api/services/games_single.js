const db = require("./db");
const helper = require("../helper");
const games = require("./games");

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
          mA.display_name AS player_a_display_name,
          mB.display_name AS player_b_display_name
    FROM games_single g
    LEFT JOIN member mA ON g.player_a = mA.member_id
    LEFT JOIN member mB ON g.player_b = mB.member_id
    WHERE g.player_a = ? OR g.player_b = ?
  `;
  const rows = await db.query(sqlSelect, [member_id, member_id]);
  const data = helper.emptyOrRows(rows);
  return data.map(row => {
    const host = (member_id === row.tA_pA_id || member_id === row.tA_pB_id);
    // build opponent_display_name
    const opponent_display_name = host ? row.player_a_display_name : row.player_b_display_name;

    // compute result
    function compareSet(setStr) {
      if (!setStr) return [0, 0];

      const parts = setStr.split("-").map(Number);
      if (parts.length !== 2 || parts.some(isNaN)) return [0, 0];

      const [scoreA, scoreB] = parts;

      if (scoreA > scoreB) return [1, 0];
      if (scoreB > scoreA) return [0, 1];
      return [0, 0]; // Unentschieden
    }
    let points_A = 0;
    let points_B = 0;
    [ row.set_one, row.set_two, row.set_three ].forEach(set => {
      const [pA, pB] = compareSet(set);
      points_A += pA;
      points_B += pB;
    });

    const result = host ? `${points_A}:${points_B}` : `${points_B}:${points_A}`


    return {
        game_id: row.game_id,
        age_divison: row.age_divison,
        timestamp: row.timestamp,
        valid: row.valid,
        opponent_display_name: opponent_display_name,
        result: result,
        play_type_db: 'games_single'
    };
  });
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
  create,
  update,
  remove,
}