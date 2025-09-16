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

/* POST member */
router.post('/', async function(req, res, next) {
  try {
    res.json(await doubles.create(req.body));
  } catch (err) {
    console.error(`Error while creating double`, err.message);
    next(err);
  }
});

/*GET member by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await doubles.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting double`, err.message);
    next(err);
  }
});

module.exports = router;