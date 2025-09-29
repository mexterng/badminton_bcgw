const express = require('express');
const router = express.Router();

const pyramide = require('../services/pyramides');

/* GET pyramide. */
// GET http://localhost:3000/member?page=xy
router.get('/single', async function(req, res, next) {
  try {
    res.json(await pyramide.getLatestSingle(req.params.age_division_id));
  } catch (err) {
    console.error(`Error while getting pyramid`, err.message);
    next(err);
  }
});

router.get('/doubles', async function(req, res, next) {
  try {
    res.json(await pyramide.getLatestDoubles(req.params.age_division_id));
  } catch (err) {
    console.error(`Error while getting pyramid`, err.message);
    next(err);
  }
});

/* GET single pyramide by ageDivision */
router.get('/single/:ageDivision', async function(req, res, next) {
  try {
    res.json(await pyramide.getSinglePyramide(req.params.ageDivision));
  } catch (err) {
    console.error(`Error while getting single pyramid`, err.message);
    next(err);
  }
});

/* GET double pyramide by ageDivision */
router.get('/doubles/:ageDivision', async function(req, res, next) {
  try {
    res.json(await pyramide.getDoublePyramide(req.params.ageDivision));
  } catch (err) {
    console.error(`Error while double pyramid`, err.message);
    next(err);
  }
});

module.exports = router;