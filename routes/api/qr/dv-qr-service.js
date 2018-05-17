var dvQRQuery = require('./dv-qr-query');
var mysqlPool = require('../../../common/database/mysql');
mysqlPool.generatePool();


const dvQRService = {
  getQRURL: function (matchingId, status) { 

    console.log(matchingId + status)

    dvQRQuery.selectMatchingByIdStatus(mysqlPool, matchingId, status)
      .then(result => { 
        return Promise.resolve('/api/qr/'+result.status+'-'+result.id);
      })
  }
}
module.exports = dvQRService;