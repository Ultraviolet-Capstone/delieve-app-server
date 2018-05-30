var dvMatchingQuery = require('../../../models/dv-matching-query');
var mysqlPool = require('../../../common/database/mysql');
var errorMessage = require('../../../common/error/error-message');
mysqlPool.generatePool();

const dvMatchingService = {
  matchNewRequest: function (req) {
    const { delivererId, requestId, time } = req.body;

    if (delivererId == undefined || requestId == undefined || time == undefined) {
      return Promise.reject({ status: 412, message: errorMessage.MAL_PARMETER });
    }

    return dvMatchingQuery.matchNewRequest(mysqlPool, delivererId, requestId, time)
      .then(result => {
        return Promise.resolve({ delivererId: delivererId }); 
      })
      .catch(err => {
        return Promise.reject({ status: err.status, message: err.message });
      }); 
  },
};

module.exports = dvMatchingService;