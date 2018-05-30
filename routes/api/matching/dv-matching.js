var router = require('express').Router();
var dvMatchingService = require('./dv-matching-service');

router.post('/', (req, res) => {
  dvMatchingService.matchNewRequest(req)
    .then(result => {
      res.status(200).json(result); 
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

module.exports = router;