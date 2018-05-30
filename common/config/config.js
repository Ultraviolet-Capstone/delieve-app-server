module.exports = {
  "development" : {
    "db_host"     : "ultra-delieve.cutg0fyjoumk.ap-northeast-2.rds.amazonaws.com",
    "db_user"     : "root",
    "db_password" : "mypassword",
    "db_port"     : 3306,
    "db_database" : "delieve",
    "connection_limit" : 10,
    "access_key_id" : "AKIAJLPBAPCOWV46F75Q",
    "secret_access_key" : "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",
    "bucket": 'delieve-image-bucket',
    "buket_url" : 'https://s3.ap-northeast-2.amazonaws.com/delieve-image-bucket'
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