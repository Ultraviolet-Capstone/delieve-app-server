var dvRequestQuery = require('../../../models/dv-request-query');
var mysqlPool = require('../../../common/database/mysql');
mysqlPool.generatePool();

const dvRequestService = {
  insertRequest: function (req) {
    const dvRequest = req.body;
    return dvRequestQuery.insertRequest(mysqlPool, dvRequest);
  }
}
module.exports = dvRequestService;