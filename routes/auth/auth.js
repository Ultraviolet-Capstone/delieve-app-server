var express = require('express'); 

var authService = require('./auth-service');
var router = express.Router();

router.get('/admin/token', (req, res, next) => {
  authService.generateTokenForAdmin(req, res)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(err.status).send(err);
    });
});

router.get('/user/login', (req, res) => { 
  authService.loginUserByToken(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

router.get('/receiver/token', (req, res) => {
  authService.loginReceiver(req)
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});


router.post('/user/register', (req, res) => {
  authService.registerUser(req)
    .then(result => {
      res.status(200).json();
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

module.exports = router;