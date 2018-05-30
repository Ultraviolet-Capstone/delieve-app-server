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
  },
  getEvaluateInfo : function(pool) {
    const query = `SELECT der.id as id,
                   der.user_id as userId,
                   u.name,
                   u.email as email,
                   u.birthday as birthday,
                   u.phone as phone,
                   u.provider_selfi_url as selfiUrl
                   FROM dv_delievery_evaluation_request der
                    JOIN dv_user u
                    ON u.id = der.user_id
                   WHERE der.status=?
                   ORDER BY der.registration_date ASC
                   LIMIT ?;`
    return pool.query(query, ['WAIT', 1]);
  },
  getEvaluateCnt : function(pool) {
    const query = `SELECT COUNT(*) as total
                   FROM dv_delievery_evaluation_request  der
                    JOIN dv_user u
                    ON u.id = der.user_id
                   WHERE status=?;`
    return pool.query(query, ['WAIT']);
  },
  updateStatus : function(pool, status, userId) {
    const query = `UPDATE dv_delievery_evaluation_request 
                   SET status=?
                   WHERE user_id=?;`
    return pool.query(query, [status, userId]);
  }
}
module.exports = delieveryEvaluationRequestQuery;