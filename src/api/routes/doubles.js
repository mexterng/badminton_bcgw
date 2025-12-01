const express = require('express');
const router = express.Router();

const doubles = require('../services/doubles');

/* GET doubles. */
// GET http://localhost:3000/doubles?page=xy
router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    res.json(await doubles.getMultiple(page));
  } catch (err) {
    console.error(`Error while getting doubles `, err.message);
    next(err);
  }
});

/* POST doubles */
router.post('/', async function(req, res, next) {
  try {
    res.json(await doubles.create(req.body));
  } catch (err) {
    console.error(`Error while creating double`, err.message);
    next(err);
  }
});

/* GET or CREATE doubles by player IDs */
// GET http://localhost:3000/doubles/by-players?playerA=1&playerB=2
router.get('/by-players', async function(req, res, next) {
  try {
    const playerA = parseInt(req.query.playerA, 10);
    const playerB = parseInt(req.query.playerB, 10);

    if (!playerA || !playerB) {
      return res.status(400).json({ error: "Beide player IDs müssen angegeben werden" });
    }

    // ensure player_a_id <= player_b_id
    const [aId, bId] = playerA <= playerB 
      ? [playerA, playerB] 
      : [playerB, playerA];

    // Get or create the doubles pair
    const double = await doubles.getOrCreateByPlayers(aId, bId);
    res.json(double);
  } catch (err) {
    console.error(`Error while getting or creating double`, err.message);
    next(err);
  }
});

/*GET doubles by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await doubles.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting double`, err.message);
    next(err);
  }
});

module.exports = router;