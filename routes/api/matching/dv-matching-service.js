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
  findMatchByRequestId: function (req) {
    const { requestId } = req.query;

    return dvMatchingQuery.findMatchingByRequestId(mysqlPool, requestId)
      .then(rows => {
        if (rows.length == 0) {
          return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH });
        }
        return Promise.resolve(rows[0]);
      }); 
  },
  findMatchByMatchingId: function (req) {
    const { id } = req.params;

    if (id == 'all') {
      return dvMatchingQuery.getAllMatching(mysqlPool)
        .then(rows => {
          if (rows.length == 0) {
            return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH });
          }
          return Promise.resolve(rows);
        }); 
    }
    else {
      return dvMatchingQuery.findMatchingByMatchingId(mysqlPool, id)
        .then(rows => {
          if (rows.length == 0) {
            return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH });
          }
          return Promise.resolve(rows[0]);
        }); 
    } 
  },
  getMathingListByUserId: function(req) { 
    const { userId } = req.params;

    return dvMatchingQuery.getMatchingListByUserId(mysqlPool, userId)
      .then(rows => {
        if (rows.length == 0) {
          return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH})
        } 
        return Promise.resolve(rows);
      })
      .catch(err => {
        if(err.message) return Promise.reject(err);
        return Promise.reject({status : 500, message: errorMessage.INTERNAL_ERROR});
      });
  }
};

module.exports = dvMatchingService;