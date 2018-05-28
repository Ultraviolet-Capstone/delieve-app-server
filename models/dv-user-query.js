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
  insertUser: function (pool,
    name,
    phone,
    email,
    birthday,
    token,
    token_provider,
    provider_selfi_url,
    provider_nickname,
    gender
  ) {
    const query = `
    INSERT dv_user (
      name,
      phone,
      email,
      birthday,
      token,
      token_provider,
      provider_selfi_url,
      provider_nickname,
      gender
    )
    values (
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ?,
     ? 
    )
    `;
    const parameters = [
      name,
      phone,
      email,
      birthday,
      token,
      token_provider,
      provider_selfi_url,
      provider_nickname,
      gender
    ];
    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INSERT_ERROR });
      });
  },
}
module.exports = userQuery;