const express = require('express');
const router = express.Router();

const games_single = require('../services/games_single');
const games_double = require('../services/games_double');

/*GET games by member_id */
router.get('/member/:id', async function(req, res, next) {
  try {
    const memberId = parseInt(req.params.id, 10);
    if (isNaN(memberId)) {
      return res.status(400).json({ error: 'Ungültige Mitglieder-ID' });
    }
    // Parallel abrufen
    const [singles, doubles] = await Promise.all([
      games_single.getGamesOfMember(memberId),
      games_double.getGamesOfMember(memberId)
    ]);
    const allGames = [...singles, ...doubles];
    allGames.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // sort by timestamp descending

    res.json(allGames);
  } catch (err) {
    console.error(`Error while getting game`, err.message);
    next(err);
  }
});


module.exports = router;