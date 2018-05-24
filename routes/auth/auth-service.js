var jwt = require('jsonwebtoken')

var errorMessage = require('../../common/error/error-message');
var common = require('../../common/common');
var adminQuery = require('../../models/dv-admin-query')

var mysqlPool = require('../../common/database/mysql');
mysqlPool.generatePool();

const GRANT_TYPE = 'password';
const secretKey = 'SeCrEtKeYfOfDeLiEvE';

const authService = {
  generateTokenForAdmin: function(req) {
    const { userName, password, grantType } = req.query;
    if (grantType !== GRANT_TYPE) return Promise.reject({ status : 403, message: errorMessage.PERMISION_DENY })

    return adminQuery.getAdminPassword(mysqlPool, userName)
      .then(_password => {
        if (password !== _password) return Promise.reject({ status : 404, message: errorMessage.WRONG_PASSWORD })
        return jwt.sign(generateSignObj(userName, true), secretKey, {expiresIn: '1d'})
      })
      .then(token => {
        return Promise.resolve({status : 200, accessToken: token});
      })
      .catch(err => {
        if(err.message) return Promise.reject(err);
        return Promise.reject({status : 403, message: errorMessage.PERMISION_DENY});
      });
  },
}

function generateSignObj(userName, isAdmin) {
  return { name : userName, isAdmin: isAdmin };
}



module.exports = authService;
