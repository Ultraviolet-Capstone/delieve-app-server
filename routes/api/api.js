var express = require('express');
var router = express.Router();

// router
var dvGPS = require('./gps/dv-gps');
var dvRequest = require('./request/dv-request');
var dvQR = require('./qr/dv-qr');
var dvEvaluate = require('./evaluate/dv-evaluate');

router.use('/gps', dvGPS);
router.use('/request', dvRequest);
router.use('/qr', dvQR);
router.use('/evaluate', dvEvaluate);

module.exports = router;