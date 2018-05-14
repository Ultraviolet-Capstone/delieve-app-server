var dvGPSQuery = require('./dv-gps-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const dvGPSService = {
  gpsById : function(req, res) {
    const id = req.params.id;
    return dvGPSQuery.gpsById(res, mysqPool, id);
  }
}
module.exports = dvGPSService;