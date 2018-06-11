var errorMessage = require('../common/error/error-message')

const dvRequestQuery = {
  insertRequest : (pool, dvRequest) => {
    const query = `CALL ADD_DV_REQUEST(
        ?, ?, ?,
        ?, ?, ?, 
        ?,
        ?,
        ?, ?,
        ?, ?, ?, ?,
        ?
    )`;

    const parameter = [
      dvRequest.beginLocation.address, dvRequest.beginLocation.gps.latitude, dvRequest.beginLocation.gps.longitude,
      dvRequest.finishLocation.address, dvRequest.finishLocation.gps.latitude, dvRequest.finishLocation.gps.longitude,
      dvRequest.senderId,
      dvRequest.recieverPhoneNumber,
      dvRequest.beginTime, dvRequest.finishTime,
      dvRequest.stuff.name, dvRequest.stuff.size, dvRequest.stuff.weight, dvRequest.stuff.stuffCode,
      dvRequest.price
    ];

    if (parameter.includes(undefined)) {
      return Promise.reject(errorMessage.INSERT_ERROR);
    } 
    return pool.query(query, parameter)
  }
}

module.exports = dvRequestQuery;