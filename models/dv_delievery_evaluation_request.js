const delieveryEvaluationRequestQuery = {
  getDelieveryEvaluationRequestByFolderPath : function(pool, folderPath) {
    const query = `SELECT folder_path as folderPath
                   FROM delieve.dv_delievery_evaluation_request
                   WHERE folder_path=?`
    return pool.query(query, [folderPath]);
  },
  getDelieveryEvaluationRequestByUserId : function(pool, userId) {
    const query = `SELECT folder_path as folderPath
                   FROM delieve.dv_delievery_evaluation_request
                   WHERE user_id=?`
    return pool.query(query, [userId]);
  },
  insertDelieveryEvaluationRequest : function(pool, userId, folderPath) {
    const query = `INSERT INTO dv_delievery_evaluation_request
                   (
                     user_id,
                     folder_path
                   ) VALUES(?, ?)`
    return pool.query(query, [userId, folderPath]);
  }
}
module.exports = delieveryEvaluationRequestQuery;