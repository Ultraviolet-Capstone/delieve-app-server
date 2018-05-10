var errorMessage = require('../../../common/error/error-message');

const gpsQuery = {
  gpsById : function(res, pool, id) {
    const query = `SELECT *
                   FROM gps
                   WHERE id=?`;
    return pool.query(res, query, [id])
    .then(result => {
      if (result.length === 0) {
        res.status(500).send(errorMessage.NO_ITEM_SEARCH);
      }
      return result[0];
    })
  }
}
module.exports = gpsQuery;