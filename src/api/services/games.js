const db = require("./db");
const helper = require("../helper");

async function getPlacement(table, id, age_division, connection = null){
    const sqlQuery = `
        SELECT placement 
        FROM ${table} 
        WHERE player_id = ? AND age_division_id = ? 
        ORDER BY timestamp DESC 
        LIMIT 1
    `;

    let rows = null;
    if (connection){
        [rows] = await connection.execute(sqlQuery, [id, age_division]);
    }
    else{
        rows = db.query(sqlQuery, [id, age_division]);
    }
    const data = helper.emptyOrRows(rows);
    return data.length ? data[0].placement : Infinity;
}

module.exports = {
  getPlacement
}