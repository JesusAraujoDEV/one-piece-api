const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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
    }
    const { limit, offset } = query;
    if (limit && offset){
      options.limit = limit;
      options.offset = offset;
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