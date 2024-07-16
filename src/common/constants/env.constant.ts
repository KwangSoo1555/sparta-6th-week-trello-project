export const ENV = {
  //server
  SERVER_PORT: process.env.SERVER_PORT,
  MYSQL_URI: process.env.MYSQL_URI,

  //redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_USERNAME: process.env.REDIS_USERNAME,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_DBNAME: process.env.REDIS_DBNAME,

  //Auth
  MAIL_AUTH_USER: process.env.MAIL_AUTH_USER,
  MAIL_AUTH_PASS: process.env.MAIL_AUTH_PASS,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};
