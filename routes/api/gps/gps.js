var express = require('express');
var gpsService = require('./gps-service');
var router = express.Router();

router.get('/:id', function(req, res, next){
  gpsService.gpsById(req, res)
  .then(result => {
    res.json(result);
  })
});

module.exports = router;