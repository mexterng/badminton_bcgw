const express = require('express');
const router = express.Router();

const member = require('../services/member');

/* GET members. */
// GET http://localhost:3000/member?page=xy
// GET http://localhost:3000/member?all=true
router.get('/', async function(req, res, next) {
  try {
    if (req.query.all === 'true') {
      res.json(await member.getMultiple(1, true));
    } else {
      const page = parseInt(req.query.page, 10) || 1;
      res.json(await member.getMultiple(page));
    }
  } catch (err) {
    console.error(`Error while getting members`, err.message);
    next(err);
  }
});

/* GET members by ageDivision */
router.get('/age_division/:ageDivision', async function(req, res, next) {
  try {
    if (req.query.all === 'true') {
      res.json(await member.getMultipleByAgeDivision(req.params.ageDivision, 1, true));
    } else {
      const page = parseInt(req.query.page, 10) || 1;
      res.json(await member.getMultipleByAgeDivision(req.params.ageDivision, page));
    }
  } catch (err) {
    console.error(`Error while getting members of ageDivision ${req.params.ageDivision}`, err.message);
    next(err);
  }
});

/* POST member */
router.post('/', async function(req, res, next) {
  try {
    res.json(await member.create(req.body));
  } catch (err) {
    console.error(`Error while creating member`, err.message);
    next(err);
  }
});

/* PATCH member */
router.patch('/:id', async function(req, res, next) {
  try {
    res.json(await member.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating member`, err.message);
    next(err);
  }
});

/*GET member by id */
router.get('/:id', async function(req, res, next) {
  try {
    res.json(await member.getSingle(req.params.id));
  } catch (err) {
    console.error(`Error while getting member`, err.message);
    next(err);
  }
});

module.exports = router;

