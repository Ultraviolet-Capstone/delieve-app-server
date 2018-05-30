var express = require('express');
var multer = require('multer');
var router = express.Router();

var evalulateService = require('./dv-evaluate-service');

var memorystorage = multer.memoryStorage()
var upload = multer({ storage: memorystorage })

const fields = [{ name: 'idcard' }, { name: 'selfi' }];

router.post('/deliver', upload.fields(fields), (req, res, next) => {

  evalulateService.evalulate(req, res)
    .then(result => {
      res.status(200).json({});
    })
    .catch(err => {
      res.status(500).json({});
    });
});

module.exports = router;