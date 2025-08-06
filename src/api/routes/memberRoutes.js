const express = require('express');
const router = express.Router();

const member = require('../services/member');

/* GET programming languages. */
router.get('/member', async function(req, res, next) {
  try {
    res.json(await member.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting members `, err.message);
    next(err);
  }
});

module.exports = router;