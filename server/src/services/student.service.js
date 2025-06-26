const knex = require('../config/knex');

const studentModel = require('../models/student.model');
const AppError = require('../utils/AppError');

const createStudent = async (studentData) => {
  const existingRa = await studentModel.findByRa(studentData.ra);
  if (existingRa) throw new AppError('RA already exists', 400);

  const existingCpf = await knex('students')
    .where({ cpf: studentData.cpf })
    .first();
  if (existingCpf) throw new AppError('CPF already exists', 400);

  const existingEmail = await knex('students')
    .where({ email: studentData.email })
    .first();
  if (existingEmail) throw new AppError('Email already exists', 400);

  return studentModel.create(studentData);
};

const getStudents = async () => {
  return studentModel.findAll();
};

const getStudentByRa = async (ra) => {
  const student = await studentModel.findByRa(ra);
  if (!student) throw new AppError('Student not found', 404);
  return student;
};

const updateStudent = async (ra, studentData) => {
  if (studentData.ra || studentData.cpf) {
    throw new AppError('RA and CPF cannot be updated', 400);
  }

  if (studentData.email) {
    const existingEmail = await knex('students')
      .where({ email: studentData.email })
      .whereNot({ ra })
      .first();
    if (existingEmail) throw new AppError('Email already in use', 400);
  }

  const updatedStudent = await studentModel.updateByRa(ra, studentData);
  if (!updatedStudent) throw new AppError('Student not found', 404);
  return updatedStudent;
};

const deleteStudent = async (ra) => {
  const deleted = await studentModel.deleteByRa(ra);
  if (!deleted) throw new AppError('Student not found', 404);
  return deleted;
};

module.exports = {
  createStudent,
  getStudents,
  getStudentByRa,
  updateStudent,
  deleteStudent,
};
