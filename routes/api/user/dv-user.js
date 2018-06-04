var router = require("express").Router();
var dvUserService = require("./dv-user-service");

router.get("/:id/delivable", (req, res) => {
  dvUserService.getDelivable(req)
    .then (result => {
      res.status(200).json({ status: result });
    })
    .catch(err => {
      res.status(err.status).send(err.message);
    });
});

module.exports = router;