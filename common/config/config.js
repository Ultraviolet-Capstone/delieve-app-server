module.exports = {
  "development" : {
    "db_host"     : "ultra-delieve.cutg0fyjoumk.ap-northeast-2.rds.amazonaws.com",
    "db_user"     : "root",
    "db_password" : "mypassword",
    "db_port"     : 3306,
    "db_database" : "delieve",
    "connection_limit" : 10
  },
  "production" : {
    "db_host"     : process.env.RDS_HOSTNAME,
    "db_user"     : process.env.RDS_USERNAME,
    "db_password" : process.env.RDS_PASSWORD,
    "db_port"     : process.env.RDS_PORT,
    "db_database" : process.env.RDS_DB_NAME,
    "connection_limit" : process.env.CONNECTION_LIMIT
  }
};