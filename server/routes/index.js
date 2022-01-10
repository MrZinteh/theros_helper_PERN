const express = require('express');

const greekNameRoutes = require('./greekNames.js');
const greekLastNameRoutes = require('./greekLastNames.js');

const router = express.Router();

router.get('/greekNames/:type', greekNameRoutes.greekNamesGet);
router.post('/greekNames', greekNameRoutes.greekNamesPost);
router.post('/greekNames/:lastname', greekNameRoutes.greekNamesPostLastName);
router.delete('/greekNames', greekNameRoutes.greekNamesRemove);
router.get('/greekLastNames', greekLastNameRoutes.greekLastNamesGet);

module.exports = router;