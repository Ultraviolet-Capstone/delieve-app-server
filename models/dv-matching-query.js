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
      m.id as matchingId,
      bl.address AS beginAddress,
      bg.latitude AS beginLatitude,
      bg.longitude AS beginLongitude, 
      
      fl.address AS finishAddress,
      fg.latitude AS finishLatitude,
      fg.longitude AS finishLongitude,
      
      stuff.name AS stuffName,
      stuff.size AS stuffSize,
      stuff.weight AS stuffWeight,
      stuff.stuff_code AS stuffCode,
      
      r.begin_time AS beginTime,  
      r.finish_time AS finishTime,

      r.price AS price,
      
      deliverer.name AS delivererName,
      deliverer.phone AS delivererPhone,
      deliverer.email AS delivererEmail,
      deliverer.provider_selfi_url AS delivererSelfiURL,

      reciever.phone AS recieverPhone,

      m.status AS matchingStatus,
      
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
          
          JOIN dv_reciever reciever
          ON reciever.id = r.reciever_id

        WHERE 
        m.dv_request_id = ?
        and m.status = ?
    `;

    const parameters = [requestId, readyStatus];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });
  },
  findMatchingByMatchingId: function(pool, matchingId) {
    const query = `
    SELECT 
      bl.address AS beginAddress,
      bg.latitude AS beginLatitude,
      bg.longitude AS beginLongitude, 
          
      fl.address AS finishAddress,
      fg.latitude AS finishLatitude,
      fg.longitude AS finishLongitude,
          
      stuff.name AS stuffName,
      stuff.size AS stuffSize,
      stuff.weight AS stuffWeight,
      stuff.stuff_code AS stuffCode,
          
      r.begin_time AS beginTime,  
      r.finish_time AS finishTime,

      r.price AS price,
      
      sender.name AS senderName,
      sender.phone AS senderPhone,
      sender.email AS sdnerEmail,
      sender.provider_selfi_url AS senderSelfiURL,
      deliverer.name AS delivererName,
      deliverer.phone AS delivererPhone,
      deliverer.email AS delivererEmail,
      deliverer.provider_selfi_url AS delivererSelfiURL, 
          
      reciever.phone AS recieverPhone,

      m.status AS matchingStatus,
          
      (6371*acos(cos(radians(fg.latitude))*cos(radians(bg.latitude))*cos(radians(bg.longitude)
      -radians(fg.longitude))+sin(radians(fg.latitude))*sin(radians(bg.latitude)))) AS distance


    FROM dv_matching m 
      LEFT JOIN dv_request r
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
                
      JOIN dv_user sender
      ON sender.id = r.sender_id

      JOIN dv_user deliverer
      ON deliverer.id = m.deliver_id
          
          JOIN dv_reciever reciever
          ON reciever.id = r.reciever_id

      WHERE m.id = ?
    `;
    const parameters = [ matchingId ];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });
  },
  getAllMatching: function(pool) {
    const query = `
    SELECT 
      m.id AS matchingId,
      r.id AS requestId,
      bl.address AS beginAddress,
      bg.latitude AS beginLatitude,
      bg.longitude AS beginLongitude, 
          
      fl.address AS finishAddress,
      fg.latitude AS finishLatitude,
      fg.longitude AS finishLongitude,
          
      stuff.name AS stuffName,
      stuff.size AS stuffSize,
      stuff.weight AS stuffWeight,
      stuff.stuff_code AS stuffCode,
          
      r.begin_time AS beginTime,  
      r.finish_time AS finishTime,

      r.price AS price,
      
      sender.name AS senderName,
      sender.phone AS senderPhone,
      sender.email AS sdnerEmail,
      sender.provider_selfi_url AS senderSelfiURL,
      deliverer.name AS delivererName,
      deliverer.phone AS delivererPhone,
      deliverer.email AS delivererEmail,
      deliverer.provider_selfi_url AS delivererSelfiURL, 
          
      reciever.phone AS recieverPhone,

      m.status AS matchingStatus,
          
      (6371*acos(cos(radians(fg.latitude))*cos(radians(bg.latitude))*cos(radians(bg.longitude)
      -radians(fg.longitude))+sin(radians(fg.latitude))*sin(radians(bg.latitude)))) AS distance


    FROM dv_matching m 
      LEFT JOIN dv_request r
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
                
      JOIN dv_user sender
      ON sender.id = r.sender_id

      JOIN dv_user deliverer
      ON deliverer.id = m.deliver_id
          
          JOIN dv_reciever reciever
          ON reciever.id = r.reciever_id 
    `;
    const parameters = [ ];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });

  },
  getMatchingListByUserId: function(pool, userId, isDeliverer) {
    const query = `
    SELECT 
      m.id AS matchingId,
      r.id AS requestId,
      bl.address AS beginAddress,
      bg.latitude AS beginLatitude,
      bg.longitude AS beginLongitude, 
          
      fl.address AS finishAddress,
      fg.latitude AS finishLatitude,
      fg.longitude AS finishLongitude,
          
      stuff.name AS stuffName,
      stuff.size AS stuffSize,
      stuff.weight AS stuffWeight,
      stuff.stuff_code AS stuffCode,
          
      r.begin_time AS beginTime,  
      r.finish_time AS finishTime,

      r.price AS price,
      
      sender.id AS senderId,
      sender.name AS senderName,
      sender.phone AS senderPhone,
      sender.email AS sdnerEmail,
      sender.provider_selfi_url AS senderSelfiURL,
      
      deliverer.id AS delivererId,
      deliverer.name AS delivererName,
      deliverer.phone AS delivererPhone,
      deliverer.email AS delivererEmail,
      deliverer.provider_selfi_url AS delivererSelfiURL,
          
      reciever.phone AS recieverPhone,

      m.status AS matchingStatus,
          
      (6371*acos(cos(radians(fg.latitude))*cos(radians(bg.latitude))*cos(radians(bg.longitude)
      -radians(fg.longitude))+sin(radians(fg.latitude))*sin(radians(bg.latitude)))) AS distance


    FROM dv_matching m 
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
                
      JOIN dv_user sender
      ON sender.id = r.sender_id
      JOIN dv_user deliverer
      ON deliverer.id = m.deliver_id
          
          JOIN dv_reciever reciever
          ON reciever.id = r.reciever_id

      WHERE m.deliver_id = ? or r.sender_id = ?;
    `;

    var parameters = [];

    isDeliverer = parseInt(isDeliverer);

    if (isDeliverer) {
      parameters = [userId, -1];
    }
    else {
      parameters = [-1, userId]; 
    }

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });
  },
  findStatusByMatchingId: function(pool, id) {
    const query = `
    SELECT m.status AS status FROM dv_matching m
    WHERE m.id = ?
    `;
    const parameters = [ id ];

    return pool.query(query, parameters)
      .catch(err => {
        return Promise.reject({ status: 500, message: errorMessage.INTERNAL_ERROR });
      });
  },
};

module.exports = dvMatchingQuery;
