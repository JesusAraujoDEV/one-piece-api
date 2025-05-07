const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const lastName = Joi.string();
const phone = Joi.number().integer().min(11);

const userId = Joi.number().integer();

const { createUserSchema, updateUserSchema } = require('./user_schema');

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: createUserSchema
});

const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  user: updateUserSchema
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }
