import Joi from 'joi';

const createNewStudent = Joi.object({
  student_name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  enroll_number: Joi.string().required(),
  date_of_admission: Joi.string().required(),
});
module.exports = { createNewStudent };
