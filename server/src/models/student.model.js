const knex = require('../config/database');

const create = async (studentData) => {
  return knex('students').insert(studentData).returning('*');
};

const findAll = async () => {
  return knex('students').select('*');
};

const findByRa = async (ra) => {
  return knex('students').where({ ra }).first();
};

const updateByRa = async (ra, studentData) => {
  return knex('students')
    .where({ ra })
    .update({ ...studentData, updated_at: knex.fn.now() })
    .returning('*');
};

const deleteByRa = async (ra) => {
  return knex('students').where({ ra }).del();
};

module.exports = {
  create,
  findAll,
  findByRa,
  updateByRa,
  deleteByRa,
};
