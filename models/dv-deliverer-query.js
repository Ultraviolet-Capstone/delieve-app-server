var errorMessage = require('../common/error/error-message');

const delivererQuery = {
  updateDelivererStats: function(pool, delivererId, status) {
    const query = `
    UPDATE dv_deliverer d
    SET d.status = ?
    WHERE 
    d.id = ?
    and d.status != ?
    `;
    const parameters = [status, delivererId, status];

    return pool.query(query, parameters)
      .then(result => {
        if (result.affectedRows == 0) {
          return Promise.reject({Error: errorMessage.UPDATE_ERROR});
        }
        return Promise.resolve(result);
      });
  }
}
module.exports = delivererQuery;