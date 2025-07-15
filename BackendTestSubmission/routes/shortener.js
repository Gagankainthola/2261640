const express = require('express');
const router = express.Router();
const { createShortURL ,redirectShortURL,getShortURLStats} = require('../controllers/shortenerController');

router.post('/shorturls', createShortURL);
router.get('/:shortcode', redirectShortURL);
router.get('/shorturls/:shortcode', getShortURLStats);

module.exports = router;