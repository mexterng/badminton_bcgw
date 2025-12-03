const express = require('express');
const router = express.Router();

const games_double = require('../services/games_double');

/* GET game. */
// GET http://localhost:3000/doubles?page=xy
router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    res.json(await games_double.getMultiple(page));
  } catch (err) {
    console.error(`Error while getting game `, err.message);
    next(err);
  }
});

/* POST game */
router.post('/', async function(req, res, next) {
  try {
    res.json(await games_double.create(req.body));
  } catch (err) {
    console.error(`Error while creating game`, err.message);
    next(err);
  }
});

/*GET game by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await games_double.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting game`, err.message);
    next(err);
  }
});

/*DELETE game by id */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await games_double.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting game`, err.message);
    next(err);
  }
});

/* PATCH game */
router.patch('/:id', async function(req, res, next) {
  try {
    res.json(await games_double.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updateing game`, err.message);
    next(err);
  }
});

/*GET games by member_id */
router.get('/member/:id', async function(req, res, next) {
  try {
    res.json(await games_double.getGamesOfDouble(req.params.id));
  } catch (err) {
    console.error(`Error while getting game`, err.message);
    next(err);
  }
});

module.exports = router;