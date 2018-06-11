var dvQRQuery = require('../../../models/dv-qr-query');
var mysqlPool = require('../../../common/database/mysql');
var errorMessage = require('../../../common/error/error-message')
var crypto = require('crypto');
var sms = require('../../../common/sms');
mysqlPool.generatePool();


const dvQRService = {
  getQRURL: function (matchingId, status) { 
    return dvQRQuery.selectMatchingByIdStatus(mysqlPool, matchingId, status)
      .then(result => { 
        var originString = ([result.id , result.dv_request_id , result.deliver_id , result.status , result.time_log_id].join(''));
        var hashValue = crypto.createHash('md5').update(originString).digest("hex");
        return Promise.resolve({ id: parseInt(matchingId), hashValue: hashValue });
      })
  },
  postQRURL: function (matchingId, hashValue, status) {
    var phone = "";
    var returnStatus = "";
    return dvQRQuery.selectMatchingByIdStatus(mysqlPool, matchingId, status)
      .then(result => {
        const { id, status, recieverPhone } = result;
        phone = recieverPhone;
        var originString = ([result.id , result.dv_request_id , result.deliver_id , result.status , result.time_log_id].join(''));
        var originHash = crypto.createHash('md5').update(originString).digest("hex");

        if (hashValue === originHash) {
          var newStatus = '';
          if (status == 'READY') { 
            newStatus = 'PROGRESS'; 
          }
          else if (status == 'PROGRESS')
            newStatus = 'FINISH';

          return Promise.resolve(newStatus);
        }
        else 
          return Promise.reject({ status: 404, message: errorMessage.HASH_UNMATCHED });
      })
      .then(newStatus => {
        return dvQRQuery.updateMatchingStatus(mysqlPool, matchingId, newStatus);
      })
      .then(status => {
        returnStatus = status;
        if (returnStatus == 'PROGRESS' && !process.env.dev) {
          var url = "http://13.125.124.127:4200/qr/" + matchingId;
          phone = phone.replace('-', '').trim();
          return sms.send({
            msg: url,
            mobile: phone
          }); 
        }
        else {
          return Promise.resolve(returnStatus);
        }
      })
      .then(result => {
        return Promise.resolve({ id: matchingId, status: returnStatus });
      }); 
  }
}
module.exports = dvQRService;