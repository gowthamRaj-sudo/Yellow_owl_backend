import db_connection from './config/db';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const eventRouter = require('./routes/event.routers');

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(bodyParser.json());
const corsOption = {
  origin: '*',
};
app.use(cors(corsOption));
app.use('/api', eventRouter);

dotenv.config();
const port = process.env.PORT;

const server = app.listen(port, async () => {
  try {
    const connection = await db_connection();
    if (connection) {
      const createStudentsTable = `CREATE TABLE IF NOT EXISTS students(
        id INT AUTO_INCREMENT PRIMARY KEY,
        student_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(20) NOT NULL,
        enroll_number VARCHAR(50) NOT NULL UNIQUE,
        date_of_admission VARCHAR(50) NOT NULL,action boolean
      );`;

      await connection.query(createStudentsTable);
      console.log('Table created successfully:');
    } else {
      console.error('Failed to connect to the database.');
    }
  } catch (error) {
    console.error('Error creating table:', error);
  }

  console.log(`[server]: Server is running at http://localhost:${port}`);
});

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});

process.on('SIGINT', () => {
  server.close(() => {
    console.log('Process interrupted');
  });
});
