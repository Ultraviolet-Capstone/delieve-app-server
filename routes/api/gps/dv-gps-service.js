var dvGPSQuery = require('./dv-gps-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const dvGPSService = {
  gpsById : function(req) {
    const id = req.params.id;
    return dvGPSQuery.gpsById(mysqPool, id);
  }
}
module.exports = dvGPSService;