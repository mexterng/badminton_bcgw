const games = require("./games");

const games_table = "games_double";
const pyramid_table = "pyramid_double";

async function getMultiple(page = 1) {
  return await games.getMultiple(games_table, page)
}

async function getSingle(id) {
  return await games.getSingle(id, games_table);
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
  create,
  update,
  remove,
}