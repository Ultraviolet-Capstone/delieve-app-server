var express = require('express');
var router = express.Router();

// router
var gps = require('./gps/gps');
var uvRequest = require('./uv-request/uv-request');

router.use('/gps', gps);
router.use('/uv-request', uvRequest);

module.exports = router;