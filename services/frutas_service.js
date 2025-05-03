const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('./../libs/sequelize');

class FrutasService {

  constructor(){
    this.frutas = [];
    this.generate();
  }

  generate(){
    const limit = 100;
    const tipos_fruta = ['Paramecia', 'Logia', 'Zoan']; // Lista de tipos posibles

    for (let i = 0; i < limit; i++){
      this.frutas.push(
      {
        id: i+1,
        name: faker.food.fruit(),
        type: tipos_fruta[Math.floor(Math.random() * tipos_fruta.length)],
        price: parseInt(faker.number.int({ min: 1000000, max: 4000000000 })),
        isBlock: faker.datatype.boolean()
      }
      )
    }
  }

  async create(data){
    const newFruta = {
      id: this.frutas.length + 1,
      ...data
    }
    this.frutas.push(newFruta);
    return newFruta;
  }

  async find(){
    return this.frutas;
  }

  async findOne(id){
    console.log(id);
    const fruta = this.frutas.find(item => Number(item.id) === Number(id));
    if (!fruta){
      throw boom.notFound('Fruta no encontrada');
    }
    if(fruta.isBlock){
      throw boom.conflict('Fruta bloqueada');
    }
    return fruta;
  }

  async update(id, changes){
    const index = this.frutas.findIndex(item => Number(item.id) === Number(id));
    if(index === -1){
      throw boom.notFound('Fruta no encontrada');
    }
    const fruta = this.frutas[index];
    this.frutas[index] = {
      ...fruta,
      ...changes
    };
    return this.frutas[index];
  }

  async delete(id){
    const index = this.frutas.findIndex(item => Number(item.id) === Number(id));
    if(index === -1){
      throw boom.notFound('Fruta no encontrada');
    }
    this.frutas.splice(index, 1);
    return { id };
  }
}

module.exports = FrutasService;
