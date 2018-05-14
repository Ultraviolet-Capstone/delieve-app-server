var express = require('express');
var router = express.Router();

// router
var dvGPS = require('./gps/dv-gps');
var dvRequest = require('./request/dv-request');

router.use('/gps', dvGPS);
router.use('/request', dvRequest);

module.exports = router;