var gpsQuery = require('./gps-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const gpsService = {
  gpsById : function(req, res) {
    const id = req.params.id;
    return gpsQuery.gpsById(res, mysqPool, id);
  }
}
module.exports = gpsService;