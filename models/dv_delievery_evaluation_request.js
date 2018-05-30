const delieveryEvaluationRequestQuery = {
  getDelieveryEvaluationRequestByFolderPath : function(pool, folderPath) {
    const query = `SELECT * FROM delieve.dv_delievery_evaluation_request
                   WHERE folder_path=?`
    return pool.query(query, [folderPath]);
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