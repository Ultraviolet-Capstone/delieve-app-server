var dvRequestQuery = require('./dv-request-query');
var mysqlPool = require('../../../common/database/mysql');
mysqlPool.generatePool();

const dvRequestService = {
    insertRequest: function (req, res) {
        const dvRequest = req.body;
        return dvRequestQuery.insertRequest(res, mysqlPool, uvRequest);
    }
}
module.exports = dvRequestService;