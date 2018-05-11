var express = require('express');
var uvRequestService = require('./uv-request-service');
var router = express.Router();

router.post('/', (req, res, next) => {
    uvRequestService.insertUvRequest(req, res)
        .then(result => {
            res.status(200).send();
        })
        .catch(err => {
            return res.status(500).send(err);
        })
});

module.exports = router;