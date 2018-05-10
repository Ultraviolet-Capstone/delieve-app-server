var express = require('express');
var router = express.Router();

// router
var gps = require('./gps/gps');

router.use('/gps', gps);

module.exports = router;