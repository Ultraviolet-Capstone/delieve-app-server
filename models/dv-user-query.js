var errorMessage = require('../common/error/error-message');

const userQuery = {
  findUserByTokne : function(pool, token) {
    const query = `
    SELECT u.id, u.name, u.phone, u.email, u.birthday, u.gender,
    CASE
    WHEN der.status = 'WAIT' THEN 1
    WHEN der.status = 'PASS' THEN 2
    WHEN der.status = 'SUSPEND' THEN 3
    WHEN der.status = 'DECLINE' THEN 4
    ELSE 0
    END AS delivable
    FROM delieve.dv_user u 
    LEFT JOIN dv_delievery_evaluation_request der ON der.user_id = u.id 
    WHERE u.token = ?;
    `;
    const parameters = [token];
    return pool.query(query, parameters)
      .catch(err => { 
        return Promise.reject({ status: 500, message: err.Error });
      });
  },
  getUserStatusByUserId : function(pool, userId) {
    const query = `SELECT 
                   CASE
                    WHEN der.status = 'WAIT' THEN 1
                    WHEN der.status = 'PASS' THEN 2
                    WHEN der.status = 'SUSPEND' THEN 3
                    WHEN der.status = 'DECLINE' THEN 4
                   ELSE 0
                   END AS delivable
                   FROM delieve.dv_user u 
                    LEFT JOIN dv_delievery_evaluation_request der 
                    ON der.user_id = u.id 
                   WHERE u.id = ?;`
    return pool.query(query, [userId]);
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
  updatePushToken: function(pool, pushToken, userId) {
    const query = `
    UPDATE dv_user u
    SET u.push_token = ?
    WHERE u.id = ?
    `;
    const parameters = [pushToken, userId];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.UPDATE_ERROR });
      });
  },
  getPushTokenById: function(pool, userId){
    const query = `
    SELECT u.push_token AS pushToken
    FROM dv_user u
    WHERE u.id = ?
    `;

    const parameters = [userId];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });
  }
}
module.exports = userQuery;