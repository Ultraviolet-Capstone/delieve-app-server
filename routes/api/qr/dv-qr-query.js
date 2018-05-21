var errorMessage = require('../../../common/error/error-message')

const dvQRQuery = {
  selectMatchingByIdStatus : (pool, matchingId, status) => {
    const query = `SELECT * FROM dv_matching m
    WHERE
    m.id = ?
    and m.status = ? 
    `;

    const parameters = [matchingId, status];
    if (parameters.includes(undefined)) {
      return Promise.reject({ status: 500, message: errorMessage.INSERT_ERROR });
    } 
    return pool.query(query, parameters)
      .then(result => {
        if (result.length === 0) return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH });
        return result[0];
      })
      .catch(err => {
        return Promise.reject({ status: 500, message: err.Error});
      })
  },

  updateMatchingStatus: (pool, matchingId, status) => {
    const query = `
    UPDATE dv_matching m
    SET m.status = ?
    WHERE m.id = ?; 
    `;

    const parameters = [status, matchingId];
    if (parameters.includes(undefined)) {
      return Promise.reject(errorMessage.INSERT_ERROR);
    } 
    return pool.query(query, parameters)
      .then(result => {
        return Promise.resolve(status);
      })
      .catch(err => {
        return Promise.reject({ status: 500, messsage: errorMessage.UPDATE_ERROR });
      }); 
  }
}

module.exports = dvQRQuery;