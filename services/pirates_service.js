const { faker } = require('@faker-js/faker');

class PiratesService {

  constructor(){
    this.pirates = [];
    this.generate();
  }

  generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++){
      this.pirates.push(
        {
          id: i+1,
          name: faker.person.fullName(),
          age: parseInt(faker.number.int({ min: 15, max: 80 })),
          bounty: parseInt(faker.number.int({ min: 1000000, max: 4000000000 }))
        }
      )
    }
  }

  create(){

  }

  find(){
    return this.pirates;
  }

  findOne(id){
    console.log(id);
    const resultado = this.pirates.find(item => Number(item.id) === Number(id));

    return this.pirates.find(item => Number(item.id) === Number(id));

  }

  update(){

  }

  delete(){

  }
}

module.exports = PiratesService;
