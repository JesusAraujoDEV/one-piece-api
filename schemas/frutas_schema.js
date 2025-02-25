const Joi = require('joi');

const id = Joi.number().integer().positive();
const nombre = Joi.string().alphanum().min(5).max(100);
const tipo = Joi.string().valid('logia', 'paramesia', 'zoan');
const precio = Joi.number().integer().min(100000).max(1000000000);

const createFrutaSchema = Joi.object({
  nombre: nombre.required(),
  tipo: tipo.required(),
  precio: precio.required(),
});

const updateFrutaSchema = Joi.object({
  nombre: nombre,
  tipo: tipo,
  precio: precio,
});

const getFrutaSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createFrutaSchema,
  updateFrutaSchema,
  getFrutaSchema,
};
