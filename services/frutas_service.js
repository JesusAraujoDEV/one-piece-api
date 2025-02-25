const { faker } = require('@faker-js/faker');

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
        price: parseInt(faker.number.int({ min: 1000000, max: 4000000000 }))
      }
      )
    }
  }

  create(data){
    const newFruta = {
      id: this.frutas.length + 1,
      ...data
    }
    this.frutas.push(newFruta);
    return newFruta;
  }

  find(){
    return this.frutas;
  }

  findOne(id){
    console.log(id);
    const resultado = this.frutas.find(item => Number(item.id) === Number(id));

    return this.frutas.find(item => Number(item.id) === Number(id));

  }

  update(id, changes){
    const index = this.frutas.findIndex(item => Number(item.id) === Number(id));
    if(index === -1){
      throw new Error('Fruta no encontrada');
    }
    const fruta = this.frutas[index];
    this.frutas[index] = {
      ...fruta,
      ...changes
    };
    return this.frutas[index];
  }

  delete(id){
    const index = this.frutas.findIndex(item => Number(item.id) === Number(id));
    if(index === -1){
      throw new Error('Fruta no encontrada');
    }
    this.frutas.splice(index, 1);
    return { id };
  }
}

module.exports = FrutasService;
