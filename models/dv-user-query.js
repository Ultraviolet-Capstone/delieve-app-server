var errorMessage = require('../common/error/error-message');

const userQuery = {
  findUserByTokne : function(pool, token) {
    const query = `
    SELECT * 
    FROM dv_user u
    WHERE
    u.token = ?
    `;
    const parameters = [token];
    return pool.query(query, parameters)
      .catch(err => { 
        return Promise.reject({ status: 500, message: err.Error });
      });
  },
}
module.exports = userQuery;