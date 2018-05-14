var express = require('express');
var dvRequestService = require('./dv-request-service');
var router = express.Router();

router.post('/', (req, res, next) => {
  dvRequestService.insertRequest(req, res)
    .then(result => {
      res.status(200).send();
    })
    .catch(err => {
      return res.status(500).send(err);
    })
});

module.exports = router;