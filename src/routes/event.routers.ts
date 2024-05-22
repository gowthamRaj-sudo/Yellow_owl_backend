const express = require('express');
const app = express();
const router = express.Router();
const eventControllers = require('../controller/event.controller');
const validation = require('../helpers/validation.helper');
const validator = require('express-joi-validation').createValidator({});

router.post(
  '/create',
  validator.body(validation.createNewStudent),
  eventControllers.createStudent
);
router.get('/view', eventControllers.getStudents);
router.put('/update/:id', eventControllers.updateStudent);
router.delete('/delete/:id', eventControllers.deleteStudent);

module.exports = router;
