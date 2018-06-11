var jwt = require('jsonwebtoken')
var crypto = require('crypto');

var errorMessage = require('../../common/error/error-message');
var common = require('../../common/common');
var adminQuery = require('../../models/dv-admin-query')
var userQuery = require('../../models/dv-user-query')
var matchingQuery = require('../../models/dv-matching-query');
var dvQRQuery = require('../../models/dv-qr-query');

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
  loginUserByToken: function(req) {
    const { 
      token, 
      pushToken,
    } = req.query;

    var userInfo;

    return userQuery.findUserByTokne(mysqlPool, token)
      .then(rows => {
        if (rows.length == 0) {
          return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH})
        } 
        userInfo = rows[0];
        return Promise.resolve(userInfo.id);
      })
      .then(userId => {
        return userQuery.updatePushToken(mysqlPool, pushToken, userId);
      })
      .then(updateResult => {
        return jwt.sign(generateSignObj(token, false), secretKey, {expiresIn: '1d'})
      })
      .then(jwtToken => {
        return Promise.resolve({ accessToken: jwtToken, userInfo: userInfo });
      })
      .catch(err => {
        if(err.message) return Promise.reject(err);
        return Promise.reject({status : 403, message: errorMessage.PERMISION_DENY});
      }); 
  },
  loginReceiver : function(req) {
    const {
      phoneNumber,
      matchingId
    } = req.query;

    if (!common.checkParameters([phoneNumber, matchingId])) {
      return Promise.reject({status: 403, message: errorMessage.PERMISION_DENY});
    }

    return matchingQuery.findReceiverByMathingIdAndPhoneNumber(mysqlPool, phoneNumber, matchingId)
      .then(result => {
        if (result.length == 0) {
          return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH});
        }
        return dvQRQuery.selectMatchingByIdStatus(mysqlPool, matchingId, "PROGRESS");
      })
      .then(result => { 
        var originString = ([result.id , result.dv_request_id , result.deliver_id , result.status , result.time_log_id].join(''));
        var hashValue = crypto.createHash('md5').update(originString).digest("hex");
        return Promise.resolve({ id: parseInt(matchingId), hashValue: hashValue });
      });
  },
  registerUser: function(req) {
    const {
      name,
      phone,
      email,
      birthday,
      token,
      tokenProvider,
      providerSelfiURL,
      providerNickname,
      gender,
    } = req.body;

    return userQuery.insertUser(mysqlPool,
      name,
      phone,
      email,
      birthday,
      token,
      tokenProvider,
      providerSelfiURL,
      providerNickname,
      gender
    ) 
  },
}

function generateSignObj(userName, isAdmin) {
  return { name : userName, isAdmin: isAdmin };
}



module.exports = authService;
