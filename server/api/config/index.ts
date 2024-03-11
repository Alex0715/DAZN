import dotenv from "dotenv";
dotenv.config();
export default {
  PORT: parseInt(process.env.PORT || "3001"),
  REQUEST_LIMIT: process.env.REQUEST_LIMIT,
  NODE_ENV: process.env.NODE_ENV,
  MYSQLDB: {
    DATABASE_NAME: process.env.DB_NAME,
    USERNAME: process.env.DB_USERNAME,
    PASSWORD: process.env.DB_PASSWORD,
    HOST: process.env.DB_HOST,
  },
  JWT: {
    ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
    REFRESH_TOKEN: process.env.JWT_REFRESH_SECRET,
    ISSUER: process.env.JWT_ISSUER,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
};
