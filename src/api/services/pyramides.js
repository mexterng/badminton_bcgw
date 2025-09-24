const db = require("./db");
const helper = require("../helper");
//TODO: implement
async function getLatestSingle(age_division_id) {
}
//TODO: implement
async function getLatestDoubles(age_division_id) {
}

async function create(player_id, placement, timestamp, age_division_id, pyramidTable, connection = null) {
    const sql = `
        INSERT INTO ${pyramidTable} (
            player_id,
            placement,
            timestamp,
            age_division_id
            )
            VALUES (?, ?, ?, ?)
        `;
    let result = null;
    if (connection) {
    [result] = await connection.execute(sql, [
        player_id,
        placement,
        timestamp,
        age_division_id,
    ]);
    } else {
        result = await db.query(sql, [player_id, placement, timestamp, age_division_id]);
    }

    let message = "Error in creating entry in pyramid";
    if (result.affectedRows > 0) {
        message = "Entry in pyramid created successfully";
    }
    return { message: message };
}

async function getRanking(table, age_division, connection = null) {
    const sqlQuery = `
        SELECT player_id
        FROM (
            SELECT pyramid.*,
                ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY timestamp DESC) AS rn
            FROM ${table} pyramid
            WHERE pyramid.age_division_id = ?
        ) sub
        WHERE rn = 1
        ORDER BY placement;
    `;

    let rows = null;
    if (connection){
        [rows] = await connection.execute(sqlQuery, [age_division]);
    }
    else{
        rows = await db.query(sqlQuery, [age_division]);
    }
    const data = helper.emptyOrRows(rows);
    return data.map(row => row['player_id']);
}


//TODO: implement
// get calculationtimes to later get pyramides at a certain time

module.exports = {
    getRanking,
    create
}