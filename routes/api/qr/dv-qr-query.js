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
      return Promise.reject(errorMessage.INSERT_ERROR);
    } 
    return pool.query(query, parameters)
      .then(result => {
        if (result.length === 0) return Promise.reject(errorMessage.NO_ITEM_SEARCH);
        return result[0];
      })
  }
}

module.exports = dvQRQuery;