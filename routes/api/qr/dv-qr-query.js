var errorMessage = require('../../../common/error/error-message')

const dvQRQuery = {
  selectMatchingByIdStatus : (pool, matchingId, status) => {
    const query = `SELECT * FROM dv_matching m
    WHERE
    m.id = ?
    and m.status = ? 
    `;

    const parameters = [matchingId, status];
    console.log(parameters);
    if (parameters.includes(undefined)) {
      return Promise.reject(errorMessage.INSERT_ERROR);
    } 
    console.log(query)
    return pool.query(query, parameters)
  }
}

module.exports = dvQRQuery;