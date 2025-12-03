const db = require("./db");
const helper = require("../helper");
const games = require("./games");

const games_table = "games_double";
const pyramid_table = "pyramid_double";

async function getMultiple(page = 1) {
  return await games.getMultiple(games_table, page)
}

async function getSingle(id) {
  return await games.getSingle(id, games_table);
}

async function getGamesOfDouble(member_id) {
  const sqlSelect = `
    SELECT g.*,
          dA.player_a AS tA_pA_id,
          dA.player_b AS tA_pB_id,
          dB.player_a AS tB_pA_id,
          dB.player_b AS tB_pB_id,
          mAa.display_name AS tA_pA_display_name,
          mAb.display_name AS tA_pB_display_name,
          mBa.display_name AS tB_pA_display_name,
          mBb.display_name AS tB_pB_display_name
    FROM games_double g
    INNER JOIN doubles dA ON g.player_a = dA.doubles_id
    INNER JOIN doubles dB ON g.player_b = dB.doubles_id
    LEFT JOIN member mAa ON dA.player_a = mAa.member_id
    LEFT JOIN member mAb ON dA.player_b = mAb.member_id
    LEFT JOIN member mBa ON dB.player_a = mBa.member_id
    LEFT JOIN member mBb ON dB.player_b = mBb.member_id
    WHERE dA.player_a = ? 
       OR dA.player_b = ? 
       OR dB.player_a = ? 
       OR dB.player_b = ?
  `;
  const rows = await db.query(sqlSelect, [member_id, member_id, member_id, member_id]);
  const data = helper.emptyOrRows(rows);

  return data.map(row => {
    const host = (member_id === row.tA_pA_id || member_id === row.tA_pB_id);
    // build host_display_name and opponent_display_name
    const tA_display_name = `${row.tA_pA_display_name}/${row.tA_pB_display_name}`;
    const tB_display_name = `${row.tB_pA_display_name}/${row.tB_pB_display_name}`;
    const { host_display_name, opponent_display_name } = host ? 
                { host_display_name: tA_display_name, opponent_display_name: tB_display_name } : 
                { host_display_name: tB_display_name, opponent_display_name: tA_display_name };

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
        host_display_name: host_display_name,
        opponent_display_name: opponent_display_name,
        result: result,
        play_type_db: 'games_double'
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
  getGamesOfDouble,
  create,
  update,
  remove,
}