const express = require('express');
const studentController = require('../controllers/student.controller');

const router = express.Router();

router.post('/', studentController.createStudent);
router.get('/', studentController.getStudents);
router.get('/:ra', studentController.getStudent);
router.patch('/:ra', studentController.updateStudent);
router.delete('/:ra', studentController.deleteStudent);

module.exports = router;
