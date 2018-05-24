var errorMessage = require('../common/error/error-message');

const adminQuery = {
  getAdminPassword : function(pool, userName) {
    const query = `SELECT password as password
                   FROM dv_admin
                   WHERE user_name=?`;
    return pool.query(query, [userName])
      .then(result => {
        if (result.length === 0) return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH });
        return result[0]['password'];
      })
      .catch(err => {
        if (err.message) return Promise.reject(err);
        return Promise.reject({ status: 500, message: err.Error});
      })
  }
}
module.exports = adminQuery;