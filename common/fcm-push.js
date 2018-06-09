var FCM = require('fcm-node');
var serverKey = require('./config/config').development.fcm_app_key;
var userQuery = require('../models/dv-user-query');

var fcm = new FCM(serverKey);
var mysqlPool = require('./database/mysql');
mysqlPool.generatePool();

module.exports = {
  push: function (userId, pushTitle, pushMessage) { 

  var pushToken; 

  return userQuery.getPushTokenById(mysqlPool, userId)
    .then(rows => {
      if (rows.length == 0) {
        return Promise.reject({status: 404, message: 'NO USER'});
      }

      pushToken = rows[0].pushToken; 
      if (pushToken == undefined) {
        return Promise.reject({status: 406, message: 'NO PUSH TOKEN IN USER'}); 
      }

      var message = {
        to: pushToken, // required fill with device token or topics
        // collapse_key: 'your_collapse_key', 
        data: {
          EvaluationData: true
        },
        notification: {
          title: pushTitle,
          body: pushMessage
        }
      };

      fcm.send(message, (err, pushResponse) => {
        if (err) {
          console.log('wherijasldf');
          return Promise.reject({status: 500, message: err})
        }
        else {
          return Promise.resolve("PUSH DONE");
        }
      }); 
    }); 
}
} 