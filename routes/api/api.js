var express = require('express');
var router = express.Router();

// router
var dvGPS = require('./gps/dv-gps');
var dvRequest = require('./request/dv-request');
var dvQR = require('./qr/dv-qr');
var dvEvaluate = require('./evaluate/dv-evaluate');
var dvMatching = require('./matching/dv-matching');

router.use('/gps', dvGPS);
router.use('/request', dvRequest);
router.use('/qr', dvQR);
router.use('/evaluate', dvEvaluate);
router.use('/matching', dvMatching);

module.exports = router;