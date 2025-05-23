const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor(){
    // No inicializamos productos aquí. La data vendrá de la base de datos.
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    };
    const { limit, offset } = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
    }

    const { price } = query;
    if (price){
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max){
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }


    const products = await models.Product.findAll(options);
    return products;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, { // Usamos findByPk para buscar por la llave primaria (id)
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  async update(id, changes) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    const updatedProduct = await product.update(changes);
    return updatedProduct;
  }

  async delete(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;