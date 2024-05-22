import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db_connection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to the MySQL database.');
    connection.release();
    return pool;
  } catch (err) {
    console.log('Error connecting to the database:', err);
    throw err;
  }
};

export default db_connection;
