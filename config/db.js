const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

dotenv.config();

const dbMode = (process.env.DB_MODE || 'mysql').toLowerCase();
if (dbMode !== 'mysql') {
  throw new Error(`Unsupported DB_MODE: ${dbMode}. Only "mysql" is supported in this project.`);
}

const dbName = process.env.DB_DATABASE || process.env.DB_NAME;
if (!dbName) {
  throw new Error('Missing DB database name. Set DB_DATABASE (or legacy DB_NAME) in your .env file.');
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: dbName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
