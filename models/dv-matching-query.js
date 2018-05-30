var errorMessage = require('../common/error/error-message');

const dvMatchingQuery = {
  matchNewRequest: function(pool, delivererId, requestId, time) {
    const query = `
    CALL MATCH_NEW_REQUEST(?, ?, ?);
    `;
    const parameters = [delivererId, requestId, time];

    return pool.query(query, parameters)
      .catch(err => {
        var error = { status: 500, message: errorMessage.MATCHING_ERROR };
        if (err.sqlState == 45000) {
          error = { status: 406, message: errorMessage.MATCHING_PREEMTIED };
        }

        return Promise.reject(error);
      });
  },
};

module.exports = dvMatchingQuery;
