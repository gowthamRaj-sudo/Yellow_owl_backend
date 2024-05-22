const db_connection = require('../config/db').default;

const eventService = {
  createNewStudent: async (body: any) => {
    let db;
    try {
      const {
        student_name,
        email,
        phone,
        enroll_number,
        date_of_admission,
        action = true,
      } = body;
      db = await db_connection();
      const [insertResult] = await db.query(
        'INSERT INTO students (student_name, email, phone, enroll_number, date_of_admission,action) VALUES (?, ?, ?, ?, ?,?)',
        [student_name, email, phone, enroll_number, date_of_admission, action]
      );

      const insertId = insertResult.insertId;

      const [selectResult] = await db.query(
        'SELECT * FROM students WHERE id = ?',
        [insertId]
      );
      return selectResult;
    } catch (error) {
      console.error('Error while creating student:', error);
      return false;
    }
  },

  getAllStudents: async () => {
    try {
      const db = await db_connection();
      const result = db.query(`SELECT * FROM students`);
      return result;
    } catch (e) {
      console.log('Something went to wrong !', e);
    }
  },
  updateById: async (id: any, body: any) => {
    try {
      const { student_name, email, phone, enroll_number, date_of_admission } =
        body;
      const db = await db_connection();

      const query = `
            UPDATE students 
            SET 
                student_name = ?, 
                email = ?, 
                phone = ?, 
                enroll_number = ?, 
                date_of_admission = ?
            WHERE id = ?
        `;

      const values = [
        student_name,
        email,
        phone,
        enroll_number,
        date_of_admission,
        id,
      ];

      await db.query(query, values);
      console.log('Student details updated successfully');
      return true;
    } catch (e) {
      console.log('Something went wrong!', e);
    }
  },
  deleteById: async (id: any) => {
    try {
      const db = await db_connection();
      const query = `DELETE FROM students WHERE id=?`;
      const value = [id];
      await db.query(query, value);
      return true;
    } catch (e) {
      console.log('something went to wrong !', e);
    }
  },
};

module.exports = eventService;
