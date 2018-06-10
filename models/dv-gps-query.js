var errorMessage = require('../common/error/error-message');

const dvGPSQuery = {
  gpsById : function(pool, id) {
    const query = `SELECT *
                   FROM dv_gps
                   WHERE id=?`;
    return pool.query(query, [id])
    .then(result => {
      if (result.length === 0) {
        return Promise.reject(errorMessage.NO_ITEM_SEARCH)
      }
      else { 
        return Promise.resolve(result[0]);
      }
    })
  },
  insertGPS: function(pool, latitude, longitude, sensedTime, matchingId) {
    const query = `
    INSERT dv_gps(latitude, longitude, gps_created, matching_id) values (?, ?, ?, ?)
    `;
    const parameters = [latitude, longitude, sensedTime, matchingId == undefined ? 'NULL' : matchingId];

    return pool.query(query, parameters);
  },
  gpsByMatchingId: function(pool, matchingId) { 
    const query = `
    SELECT g.latitude, g.longitude, g.gps_created
    FROM dv_gps g
    WHERE g.matching_id=?
    ORDER BY g.gps_created desc
    LIMIT 1
    `;
    const parameters = [matchingId];
    return pool.query(query, parameters)
    .then(result => {
      if (result.length === 0) {
        return Promise.resolve([]);
      }
      else { 
        return Promise.resolve(result[0]);
      }
    })
  },
  gpsListByMatchingId: function(pool, matchingId) { 
    const query = `
    SELECT g.latitude, g.longitude, g.gps_created
    FROM dv_gps g
    WHERE g.matching_id=?
    `;
    const parameters = [matchingId];
    return pool.query(query, parameters)
    .then(result => {
      if (result.length === 0) {
        return Promise.resolve([]);
      }
      else { 
        return Promise.resolve(result);
      }
    })
  },
}
module.exports = dvGPSQuery;