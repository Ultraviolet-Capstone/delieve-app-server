var aws = require('aws-sdk');
var uuidv1 = require('uuid/v1');
var Q = require('q');
var rp = require('request-promise');

var mysqlPool = require('../../../common/database/mysql');
mysqlPool.generatePool();

var errorMessage = require('../../../common/error/error-message');
var config = require('../../../common/config/config')[process.env.NODE_ENV || 'development'];
var delieveryEvaluationRequestQuery = require('../../../models/dv_delievery_evaluation_request');

aws.config.region = 'ap-northeast-2';
aws.config.update({
  accessKeyId: config.access_key_id,
  secretAccessKey: config.secret_access_key
});
var s3 = new aws.S3();

const evalulateService = {
  evalulate : function(req) {
    const userId = req.body.userId;
    var folderPath = '';
    return generateFolderPath()
      .then(_folderPath => {
        folderPath = _folderPath;
        return this.uploadImages2S3(req.files, folderPath);
      })
      .then(result => {
        return delieveryEvaluationRequestQuery.insertDelieveryEvaluationRequest(mysqlPool, userId, folderPath);
      })
  },
  uploadImages2S3 : function(files, folderPath) {
    const funcArr = [];
    for (var fileName in files) {
      const file = files[fileName][0];
      const filePath = folderPath + '/' + fileName;
      var params = {
        Bucket: config.bucket,
        Key: filePath,
        ACL: 'public-read',
        ContentType: file.mimetype,
        Body: file.buffer
      };
      funcArr.push(s3.upload(params).promise());
    }
    return Q.all(funcArr);
  },
  getIdcardFromS3 : function(req, res) {
    const userId = req.query.userId;
    return getImageFromS3(res, userId, 'idcard');
  },
  getSelfiFromS3 : function(req, res) {
    const userId = req.query.userId;
    return getImageFromS3(res, userId, 'selfi');
  },
}

function getImageFromS3(res, userId, fileName) {
  return delieveryEvaluationRequestQuery.getDelieveryEvaluationRequestByUserId(mysqlPool, userId)
    .then(evaluationRequest => {
      if (evaluationRequest.length <= 0) return Promise.reject({reason : errorMessage.NO_ITEM_SEARCH});
      return evaluationRequest[0]
    })
    .then(result => {
      const folderPath = result['folderPath'];
      const s3Url = config.buket_url + '/' + folderPath + '/' + fileName;
      return rp(s3Url).pipe(res);
    })
}

function generateFolderPath() {
  const folderPath = 'deliever_images/' + uuidv1();
  return delieveryEvaluationRequestQuery.getDelieveryEvaluationRequestByFolderPath(mysqlPool, folderPath)
    .then(result => {
      if (result.length === 0) return folderPath;
      return generateFolderPath();
    });
}

module.exports = evalulateService;