const boom = require('@hapi/boom');
const { models } = require('./../libs/sequelize');

class UsersService {

  constructor(){
  }
  async create(data) {
    return data;
  }

  async find() {
    const client = await models.User.findAll();

    return client;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = UsersService;
