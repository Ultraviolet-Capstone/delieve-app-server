var express = require('express');
var dvGPSService = require('./dv-gps-service');
var router = express.Router();


router.get('/:id', function(req, res, next){
  dvGPSService.gpsById(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    });
});

module.exports = router;