const { validationResult } = require('express-validator');
const studentService = require('../services/student.service');
const {
  createStudentRules,
  updateStudentRules,
} = require('../validators/student.validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const createStudent = async (req, res, next) => {
  try {
    console.log('Dados recebidos:', req.body);

    const student = await studentService.createStudent(req.body);

    if (!student || student.length === 0) {
      throw new Error('Falha ao criar aluno');
    }

    res.status(201).json({
      status: 'success',
      data: student[0],
    });
  } catch (err) {
    console.error('Erro no createStudent:', err);
    next(err);
  }
};
const getStudents = async (req, res, next) => {
  try {
    const students = await studentService.getStudents();
    res.json(students);
  } catch (err) {
    next(err);
  }
};

const getStudent = async (req, res, next) => {
  try {
    const student = await studentService.getStudentByRa(req.params.ra);
    res.json(student);
  } catch (err) {
    next(err);
  }
};

const updateStudent = async (req, res, next) => {
  try {
    const student = await studentService.updateStudent(req.params.ra, req.body);
    res.json(student[0]);
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (req, res, next) => {
  try {
    await studentService.deleteStudent(req.params.ra);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createStudent: [createStudentRules, handleValidationErrors, createStudent],
  getStudents,
  getStudent,
  updateStudent: [updateStudentRules, handleValidationErrors, updateStudent],
  deleteStudent,
};
