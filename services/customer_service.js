const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');
const { password } = require('pg/lib/defaults');

class CustomerService {

  constructor(){
  }
  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
        include: ['user']
    });
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const client = await models.Customer.findAll({
        include: ['user']
    });

    return client;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }

}

module.exports = CustomerService;
