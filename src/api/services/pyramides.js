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

async function getSinglePyramide(age_division, connection = null) {
    const sql = `
        SELECT sub.player_id, m.display_name, m.gender
        FROM (
            SELECT pyramid.*,
                ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY timestamp DESC) AS rn
            FROM pyramid_single pyramid
            WHERE pyramid.age_division_id = ?
        ) sub
        JOIN member m ON m.member_id = sub.player_id
        WHERE rn = 1
        ORDER BY placement;
    `;

    let rows = null;
    if (connection) {
        [rows] = await connection.execute(sql, [age_division]);
    } else {
        rows = await db.query(sql, [age_division]);
    }
    const data = helper.emptyOrRows(rows);

    return data.map(row => ({
        player_id: row.player_id,
        display_name: row.display_name,
        gender: row.gender
    }));
}

async function getDoublePyramide(age_division, connection = null) {
    const sql = `
        SELECT 
            sub.player_id AS doubles_id,
            d.player_a AS player_a_id,
            ma.display_name AS player_a_display_name,
            ma.gender AS player_a_gender,
            d.player_b AS player_b_id,
            mb.display_name AS player_b_display_name,
            mb.gender AS player_b_gender
        FROM (
            SELECT pyramid.*,
                ROW_NUMBER() OVER (PARTITION BY player_id ORDER BY timestamp DESC) AS rn
            FROM pyramid_double pyramid
            WHERE pyramid.age_division_id = ?
        ) sub
        JOIN doubles d ON d.doubles_id = sub.player_id
        JOIN member ma ON ma.member_id = d.player_a
        JOIN member mb ON mb.member_id = d.player_b
        WHERE rn = 1
        ORDER BY placement;
    `;

    let rows;
    if (connection) {
        [rows] = await connection.execute(sql, [age_division]);
    } else {
        rows = await db.query(sql, [age_division]);
    }

    return rows.map(row => {
        // build doubles_display_name
        const doublesDisplayName = `${row.player_a_display_name}/${row.player_b_display_name}`;
        
        // build doubles_gender
        let doublesGender;
        if (row.player_a_gender === 'm' && row.player_b_gender === 'm') {
            doublesGender = 'HD'; // Herrendoppel
        } else if (row.player_a_gender === 'w' && row.player_b_gender === 'w') {
            doublesGender = 'DD'; // Damendoppel
        } else {
            doublesGender = 'MX'; // Mixed
        }

        return {
            doubles_id: row.doubles_id,
            doubles_display_name: doublesDisplayName,
            doubles_gender: doublesGender
        };
    });
}

//TODO: implement
// get calculationtimes to later get pyramides at a certain time

module.exports = {
    getRanking,
    getSinglePyramide,
    getDoublePyramide,
    create
}