var express = require('express');
var router = express.Router();

// router
var dvGPS = require('./gps/dv-gps');
var dvRequest = require('./request/dv-request');
var dvQR = require('./qr/dv-qr');
var dvMatching = require('./matching/dv-matching');

router.use('/gps', dvGPS);
router.use('/request', dvRequest);
router.use('/qr', dvQR);
router.use('/matching', dvMatching);

module.exports = router;