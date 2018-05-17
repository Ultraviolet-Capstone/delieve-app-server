var express = require('express'); 
var dvQRService = require('./dv-qr-service');
var router = express.Router();


router.get('/', (req, res, next) => {

  const {id, status} = req.query;

  dvQRService.getQRURL(id, status)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).send(err);
    })

});

module.exports = router;