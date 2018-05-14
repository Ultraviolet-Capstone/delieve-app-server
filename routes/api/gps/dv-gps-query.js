var errorMessage = require('../../../common/error/error-message');

const dvGPSQuery = {
  gpsById : function(res, pool, id) {
    const query = `SELECT *
                   FROM dv_gps
                   WHERE id=?`;
    return pool.query(res, query, [id])
    .then(result => {
      if (result.length === 0) {
        return Promise.reject(errorMessage.NO_ITEM_SEARCH)
      }
      else { 
        return Promise.resolve(result[0]);
      }
    })
  }
}
module.exports = dvGPSQuery;