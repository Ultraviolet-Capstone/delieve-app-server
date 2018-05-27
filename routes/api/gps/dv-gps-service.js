var dvGPSQuery = require('../../../models/dv-gps-query');
var mysqPool = require('../../../common/database/mysql');
mysqPool.generatePool();

const dvGPSService = {
  gpsById : function(req) {
    const id = req.params.id;
    return dvGPSQuery.gpsById(mysqPool, id);
  },
  insertTrackingGPS: function(req) {
    var body = req.body;
    return dvGPSQuery.insertGPS(mysqPool, body.latitude, body.longitude, new Date(), body.matchingId)
      .then(result => {
        return Promise.resolve(body);
      })
      .catch(err => {
        return Promise.reject({ status: 500, message: err.Error});
      }) 
  },
  gpsByMatchingId: function(req) {
    var matchingId = parseInt(req.params.id);
    return dvGPSQuery.gpsByMatchingId(mysqPool, matchingId)
      .then(result => {
        return Promise.resolve({ gpsList: result, matchingId: matchingId }); 
      })
      .catch(err => {
        return Promise.reject({ status: 500, message: err.Error});
      })
  }
}
module.exports = dvGPSService;