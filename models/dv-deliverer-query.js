var errorMessage = require('../common/error/error-message');

const delivererQuery = {
  updateDelivererStats: function(pool, delivererId, status, latitude, longitude) {
    const query = `
    CALL UPDATE_DELIVERER_STATUS(?, ?, ?, ?)
    `;
    const parameters = [status, delivererId, latitude, longitude];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject(errorMessage.UPDATE_ERROR);
      });
  }
}
module.exports = delivererQuery;