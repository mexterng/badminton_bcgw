const express = require('express');
const router = express.Router();

const age_division = require('../services/age_division');

/* GET age_division. */
// GET http://localhost:3000/age_division?page=xy
router.get('/', async function(req, res, next) {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    res.json(await age_division.getMultiple(page));
  } catch (err) {
    console.error(`Error while getting age division `, err.message);
    next(err);
  }
});

/*GET age_division by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await age_division.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting age division`, err.message);
    next(err);
  }
});

module.exports = router;

