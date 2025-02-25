const { faker } = require('@faker-js/faker');

class UsersService {

  constructor(){
    this.users = [];
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

  create(){

  }

  find(){
    return this.frutas;
  }

  findOne(id){
    console.log(id);
    const resultado = this.frutas.find(item => Number(item.id) === Number(id));

    return this.frutas.find(item => Number(item.id) === Number(id));

  }

  update(){

  }

  delete(){

  }
}

module.exports = FrutasService;
