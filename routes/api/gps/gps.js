var express = require('express');
var gpsService = require('./gps-service');
var router = express.Router();

router.get('/:id', function(req, res, next){
  gpsService.gpsById(req, res)
  .then(result => {
    res.json(result);
  })
});

router.get('', function(req, res, next){
  res.send('1');
});
module.exports = router;