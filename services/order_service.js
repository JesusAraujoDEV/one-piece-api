const boom = require('@hapi/boom');

const { models }= require('./../libs/sequelize');

class OrdersService {

  constructor(){
  }

  async create(data) {
    // Accedemos al modelo Customer y usando where encadenamos hacia user
    const customer = await models.Customer.findAll({
      where: {
        '$user.id$': data.userId
      },
      include: ['user']
    });
    // Validamos que exista el customer
    if (!customer) {
      throw boom.notFound('Customer not found');
    }
    // Creamos un objeto con el customerId obtenido de la consulta
    const dataOrder = {
      customerId: customer[0].id
    };
    const newOrder = await models.Order.create(dataOrder);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async findByUser(userId){
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });

    return orders
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
        include: [
            {
            association: 'customer',
            include: ['user']
        },
        'items'
    ]
    });
    return order;
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

module.exports = OrdersService;