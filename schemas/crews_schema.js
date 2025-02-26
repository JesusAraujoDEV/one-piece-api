const Joi = require('joi');

const id = Joi.number().integer().positive();
const name = Joi.string().min(3).max(100);
const captain = Joi.string().min(3).max(100);
const ship = Joi.string().min(3).max(100);
const members = Joi.number().integer().positive().min(1).max(1000);
const bounty = Joi.number().integer().positive().min(1000000).max(50000000000);
const affiliation = Joi.string().valid('Piratas', 'Marina', 'Revolucionarios', 'Cazarrecompensas', 'Civiles');
const status = Joi.string().valid('Activa', 'Disuelta', 'Desconocida');

const createCrewSchema = Joi.object({
  name: name.required(),
  captain: captain.required(),
  ship: ship.required(),
  members: members.required(),
  bounty: bounty.required(),
  affiliation: affiliation.required(),
  status: status.required()
});

const updateCrewSchema = Joi.object({
  name,
  captain,
  ship,
  members,
  bounty,
  affiliation,
  status
});

const getCrewSchema = Joi.object({
  id: id.required()
});

module.exports = {
  createCrewSchema,
  updateCrewSchema,
  getCrewSchema
};
