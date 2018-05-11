var express = require('express');
var gpsService = require('./gps-service');
var router = express.Router();


router.get('/:id', function(req, res, next){
  gpsService.gpsById(req, res)
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    res.status(500).send(err);
  });
});

module.exports = router;