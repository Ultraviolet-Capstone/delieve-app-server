var gpsQuery = require('./gps-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const gpsService = {
  gpsById : function(req, res) {
    return gpsQuery.gpsById(res, mysqPool, 2);
  }
}
module.exports = gpsService;