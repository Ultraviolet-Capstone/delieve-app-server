var uvRequestQuery = require('./uv-request-query');
var mysqlPool = require('../../../common/database/mysql');
mysqlPool.generatePool();

const uvRequestService = {
  insertUvRequest: function (req, res) {
    const uvRequest = req.body;
    return uvRequestQuery.insertUvRequest(res, mysqlPool, uvRequest);
  }
}
module.exports = uvRequestService;