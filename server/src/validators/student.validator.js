const { body, param } = require('express-validator');
const knex = require('../config/database');

const validateRA = async (ra) => {
  const student = await knex('students').where({ ra }).first();
  if (student) throw new Error('RA já cadastrado');
};

const validateCPF = async (cpf) => {
  const student = await knex('students').where({ cpf }).first();
  if (student) throw new Error('CPF já cadastrado');
};

const validateEmailUpdate = async (email, { req }) => {
  const student = await knex('students')
    .where({ email })
    .whereNot('ra', req.params.ra)
    .first();
  if (student) throw new Error('E-mail já cadastrado para outro aluno');
};

const createStudentRules = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Nome é obrigatório')
    .isLength({ max: 100 })
    .withMessage('Nome muito longo'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('E-mail é obrigatório')
    .isEmail()
    .withMessage('E-mail inválido')
    .custom(async (email) => {
      const exists = await knex('students').where({ email }).first();
      if (exists) throw new Error('E-mail já cadastrado');
    }),

  body('ra')
    .trim()
    .notEmpty()
    .withMessage('RA é obrigatório')
    .isLength({ min: 6, max: 6 })
    .withMessage('RA deve ter 6 dígitos')
    .isNumeric()
    .withMessage('RA deve conter apenas números')
    .custom(validateRA),

  body('cpf')
    .trim()
    .notEmpty()
    .withMessage('CPF é obrigatório')
    .isLength({ min: 11, max: 11 })
    .withMessage('CPF deve ter 11 dígitos')
    .isNumeric()
    .withMessage('CPF deve conter apenas números')
    .custom(validateCPF),
];

const updateStudentRules = [
  param('ra').exists().withMessage('RA é obrigatório na URL').isString(),

  body('name')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Nome não pode ser vazio')
    .isLength({ max: 100 })
    .withMessage('Nome muito longo'),

  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('E-mail inválido')
    .custom(validateEmailUpdate),

  body().custom((body) => {
    const disallowedFields = ['ra', 'cpf', 'created_at', 'updated_at'];
    const invalidFields = Object.keys(body).filter((field) =>
      disallowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      throw new Error(
        `Campos não permitidos para atualização: ${invalidFields.join(', ')}`
      );
    }
    return true;
  }),
];

module.exports = {
  createStudentRules,
  updateStudentRules,
};
