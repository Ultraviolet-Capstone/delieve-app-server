var errorMessage = require('../../../common/error/error-message')

const uvRequestQuery = {
    insertUvRequest : (res, pool, uvRequest) => {
        const query = `CALL ADD_UV_REQUEST(
            ?, ?, ?,
            ?, ?, ?, 
            ?,
            ?, ?,
            ?, ?, ?, ?
        )`;

        const parameter = [
            uvRequest.beginLocation.address, uvRequest.beginLocation.gps.latitude, uvRequest.beginLocation.gps.longitude,
            uvRequest.finishLocation.address, uvRequest.finishLocation.gps.latitude, uvRequest.finishLocation.gps.longitude,
            uvRequest.senderId,
            uvRequest.beginTime, uvRequest.finishTime,
            uvRequest.stuff.name, uvRequest.stuff.size, uvRequest.stuff.weight, uvRequest.stuff.stuffCode
        ];

        if (parameter.includes(undefined)) {
            return Promise.reject(errorMessage.INSERT_ERROR);
        } 
        return pool.query(res, query, parameter)
    }
}

module.exports = uvRequestQuery;