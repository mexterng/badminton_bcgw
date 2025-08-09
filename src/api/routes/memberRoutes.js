const express = require('express');
const router = express.Router();

const member = require('../services/member');

/* GET members. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await member.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting members `, err.message);
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

/* PATCH programming language */
router.patch('/:id', async function(req, res, next) {
  try {
    res.json(await member.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updatingmember`, err.message);
    next(err);
  }
});
module.exports = router;

