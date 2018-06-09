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

router.get('/deliver', (req, res, next) => {
  evalulateService.getEvaluateInfo(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/deliver/total', (req, res, next) => {
  evalulateService.getEvaluateCnt(req)
    .then(result => {
      res.status(200).json({total: result});
    })
    .catch(err => {
      res.status(500).json(err);
    })
});

router.get('/deliver/idcard', (req, res, next) => {
  evalulateService.getIdcardFromS3(req, res)
    .catch(err => {
      res.status(500).json({});
    })
});

router.get('/deliver/selfi', (req, res, next) => {
  evalulateService.getSelfiFromS3(req, res)
    .catch(err => {
      res.status(500).json({});
    })
});


router.get('/deliver/status', (req, res, next) => {
  evalulateService.getSatus(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json({});
    })
});

router.post('/deliver/status', (req, res, next) => {
  evalulateService.updateStatus(req)
    .then(result => {
      res.status(200).json({});
    })
    .catch(err => {
      res.status(500).json({});
    })
});

router.get('/push-test', (req, res) => {

  const { appToken } = req.query;

  if (appToken == undefined) {
    return res.status(406).send("You should send Request with APP TOKEN KEY");
  }


  var FCM = require('fcm-node');
  var serverKey = require('../../../common/config/config').development.fcm_app_key;

  var fcm = new FCM(serverKey);

  var message = {
    to: appToken, // required fill with device token or topics
    // collapse_key: 'your_collapse_key', 
    data: {
        EvaluationData: true
    },
    notification: {
        title: 'Evaluation Push Message',
        body: 'Evaluation Done'
    }
  };

  fcm.send(message, (err, pushResponse) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
      res.status(200).send("done" + pushResponse);
    }
  });
});

module.exports = router;