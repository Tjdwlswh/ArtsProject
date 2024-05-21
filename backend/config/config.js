import dotenv from 'dotenv';
dotenv.config();
const env = process.env;

const config = {
  host: env.DB_HOST,
  username: env.DB_USER,
  password: env.DB_PWD,
  database: env.DB_NAME,
  dialect: 'mysql',
  // logging: false,
};

export { config };
