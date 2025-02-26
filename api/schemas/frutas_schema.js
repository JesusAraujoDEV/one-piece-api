const Joi = require('joi');

const id = Joi.number().integer().positive();
const nombre = Joi.string().min(5).max(100);
const tipo = Joi.string().valid('logia', 'paramesia', 'zoan');
const precio = Joi.number().integer().positive().min(100000).max(1000000000).strict();

const createFrutaSchema = Joi.object({
  name: nombre.required(),
  type: tipo.required(),
  price: precio.required(),
});

const updateFrutaSchema = Joi.object({
  name: nombre,
  type: tipo,
  price: precio,
});

const getFrutaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createFrutaSchema,
  updateFrutaSchema,
  getFrutaSchema,
};
