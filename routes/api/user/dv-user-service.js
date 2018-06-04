var dvUserQuery = require("../../../models/dv-user-query");
var errorMessage = require("../../../common/error/error-message");
var mysql = require("../../../common/database/mysql");
mysql.generatePool();

const dvUserService = {
  getDelivable : function(req) {
    const { id } = req.params;
    return dvUserQuery.getUserStatusByUserId(mysql, id) .then(rows => {
        if (rows.length == 0) {
          return Promise.reject({ status: 404, message: errorMessage.NO_ITEM_SEARCH})
        } 
        return Promise.resolve(rows[0].delivable);
      })
      .catch(err => {
        if(err.message) return Promise.reject(err);
        return Promise.reject({status : 500, message: errorMessage.INTERNAL_ERROR});
      });
  },
};

module.exports = dvUserService;