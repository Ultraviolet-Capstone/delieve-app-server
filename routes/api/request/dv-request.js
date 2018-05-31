var express = require('express');
var dvRequestService = require('./dv-request-service');
var router = express.Router();

router.post('/', (req, res, next) => {
  dvRequestService.insertRequest(req)
    .then(result => {
      return res.status(200).json({requestId : result});
    })
    .catch(err => {
      return res.status(500).send(err);
    })
});

module.exports = router;