const eventServices = require('../service/event.service');

const eventController = {
  createStudent: async (req: any, res: any) => {
    console.log(req.body);
    try {
      const response = await eventServices.createNewStudent(req.body);
      console.log('response', response);
      if (response) {
        res.status(200).send({
          status: 'Success',
          message: 'New  Student created successfully !',
          data: response,
        });
      } else {
        res
          .status(409)
          .send({ status: 'failure', message: 'Failed to create new student' });
      }
    } catch (e) {
      console.log('Error while creating student');
    }
  },
  getStudents: async (req: any, res: any) => {
    try {
      const response = await eventServices.getAllStudents();
      if (response) {
        res.status(200).send(response[0]);
      } else {
        res
          .status(409)
          .send({ status: 'failure', message: 'Something went to wrong !' });
      }
    } catch (e) {
      console.log('something went to wrong', e);
    }
  },
  updateStudent: async (req: any, res: any) => {
    console.log(req.body);
    try {
      const response = await eventServices.updateById(req.params.id, req.body);
      if (response) {
        res.status(200).send({
          status: 'Success',
          message: 'Update Successfully!',
        });
      } else {
        res
          .status(409)
          .send({ status: 'failure', message: 'Something went wrong!' });
      }
    } catch (e) {
      console.log('something went to wrong !', e);
    }
  },
  deleteStudent: async (req: any, res: any) => {
    try {
      const response = await eventServices.deleteById(req.params.id);
      if (response) {
        res
          .status(200)
          .send({ status: 'success', message: 'Delete successfully !' });
      } else {
        res.status(409).send({ message: 'something went to wrong!' });
      }
    } catch (e) {
      console.log(e);
    }
  },
};

module.exports = eventController;
