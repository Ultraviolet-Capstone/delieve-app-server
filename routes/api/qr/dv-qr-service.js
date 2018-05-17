var dvQRQuery = require('./dv-qr-query');
var mysqlPool = require('../../../common/database/mysql');
mysqlPool.generatePool();


const dvQRService = {
  getQRURL: function (matchingId, status) { 
    return dvQRQuery.selectMatchingByIdStatus(mysqlPool, matchingId, status)
      .then(result => {
        const { id, status } = result;
        const _result = {
          id : id,
          url : '/api/qr/'+ status +'-'+ id
        }
        return Promise.resolve(_result);
      })
  }
}
module.exports = dvQRService;