var express = require('express');
var dvMatchingService = require('./dv-matching-service');
var router = express.Router();

router.post('/deliverer', (req, res) => {
  dvMatchingService.updateDelivererStatus(req)
    .then(result => {
      res.status(200).json(result); 
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

module.exports = router;