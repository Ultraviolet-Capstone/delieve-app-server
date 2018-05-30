var errorMessage = require('../common/error/error-message');

const readyStatus = 'READY';

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
  findMatchingByRequestId: function(pool, requestId) {
    const query = `
    SELECT 
      r.id as matchingId,
      bl.address AS beginAddress,
      bg.latitude AS beginLatitude,
      bg.longitude AS beginLongitude, 
      
      fl.address AS finishAddress,
      fg.latitude AS finishLatitude,
      fg.longitude AS finishLongitude,
      
      stuff.name AS stuffName,
      stuff.size AS stuffSize,
      stuff.weight AS stuffWeight,
      
      r.begin_time AS beginTime,  
      r.finish_time AS finishTime,
      
      deliverer.name AS delivererName,
      deliverer.phone AS delivererPhone,
      deliverer.email AS delivererEmail,
      deliverer.provider_selfi_url AS delivererSelfiURL,
      
      (6371*acos(cos(radians(fg.latitude))*cos(radians(bg.latitude))*cos(radians(bg.longitude)
      -radians(fg.longitude))+sin(radians(fg.latitude))*sin(radians(bg.latitude)))) AS distance
        

      FROM delieve.dv_matching m 
        JOIN dv_request r 
        ON r.id = m.dv_request_id 
          
          JOIN dv_location bl
          ON bl.id = r.begin_location_id
            JOIN dv_gps bg
            ON bg.id = bl.gps_id
              
          JOIN dv_location fl
          ON fl.id = r.finish_location_id
            JOIN dv_gps fg
            ON fg.id = fl.gps_id
              
          JOIN dv_stuff stuff
          ON stuff.id = r.stuff_id 
              
              JOIN dv_user deliverer
              ON deliverer.id = m.deliver_id

        WHERE 
        m.dv_request_id = ?
        and m.status = ?
    `;

    const parameters = [requestId, readyStatus];

    return pool.query(query, parameters)
      .catch(err => {
        Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });
  }
};

module.exports = dvMatchingQuery;
