const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(100);
const crew = Joi.string().min(3).max(100);
const bounty = Joi.number().integer().positive().min(1000000).max(5000000000);
const devilFruit = Joi.string().allow(null, '');
const role = Joi.string().valid('Capitán', 'Espadachín', 'Médico', 'Navegante', 'Francotirador', 'Cocinero', 'Músico', 'Arqueólogo', 'Carpintero', 'Timonel');
const status = Joi.string().valid('Vivo', 'Desaparecido', 'Capturado', 'Desconocido');

const createPirataSchema = Joi.object({
  name: name.required(),
  crew: crew.required(),
  bounty: bounty.required(),
  devilFruit: devilFruit.optional(),
  role: role.required(),
  status: status.required()
});

const updatePirataSchema = Joi.object({
  name,
  crew,
  bounty,
  devilFruit,
  role,
  status
});

const getPirataSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createPirataSchema,
  updatePirataSchema,
  getPirataSchema
};
