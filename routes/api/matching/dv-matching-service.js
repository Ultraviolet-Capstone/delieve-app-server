var dvDeliverergQuery = require('../../../models/dv-deliverer-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const dvMatchingService = {
  updateDelivererStatus: function(req) {
    var {status, delivererId, latitude, longitude} = req.body;
    return dvDeliverergQuery.updateDelivererStats(mysqPool, delivererId, status, latitude, longitude)
      .then (result => {
        return Promise.resolve({ status: status, latitude: latitude, longitude: longitude }); 
      })
      .catch(err => {
        return Promise.reject({ status: 500, message: err });
      })
  },
}
module.exports = dvMatchingService;