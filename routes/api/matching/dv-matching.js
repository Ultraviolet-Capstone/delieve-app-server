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

router.get('/', (req, res) => {
  dvMatchingService.findMatchByRequestId(req)
    .then(result => {
      res.status(200).json(result); 
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.get('/user/:userId', (req, res) => {
  dvMatchingService.getMathingListByUserId(req)
    .then (result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    }); 
});

router.get('/:id', (req, res) => {
  dvMatchingService.findMatchByMatchingId(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    })
});
module.exports = router;