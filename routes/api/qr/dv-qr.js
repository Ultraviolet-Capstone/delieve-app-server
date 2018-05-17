var express = require('express'); 
var dvQRService = require('./dv-qr-service');
var router = express.Router();


router.get('/', (req, res, next) => {

  const query = req.query;

  console.log (query.id);
  dvQRService.getQRURL(query.id, query.status)
    .then(result => { 
      console.log(result)
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err)
      res.status(500).send(err);
    })

});

module.exports = router;