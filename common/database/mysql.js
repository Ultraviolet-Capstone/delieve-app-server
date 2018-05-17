var mysql = require('promise-mysql');
var config = require('../config/config.js')[process.env.NODE_ENV || 'development'];


const mysqlService = {
  generatePool : function() {
    this.pool = mysql.createPool({
      connectionLimit : config.connection_limit,
      host     : config.db_host,
      user     : config.db_user,
      password : config.db_password,
      port     : config.db_port,
      database : config.db_database,
    });
  },
  query : function(query, arr) {
    return this.pool.query(query, arr)
  }
}

module.exports = mysqlService;