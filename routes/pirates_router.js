const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const pirates = [];
  for (let i = 0; i < limit; i++){
    pirates.push(
      {
        id: i+1,
        name: faker.person.fullName(),
        age: parseInt(faker.number.int({ min: 15, max: 80 })),
        bounty: parseInt(faker.number.int({ min: 1000000, max: 4000000000 }))
      }
    )
  }
  res.json(pirates);
});

router.get('/filter' , (req, res) => {
  res.send('Filtrando piratas');
});

router.get('/:id' , (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Gomu Gomu no Mi',
    type: 'Paramecia',
    user: 'Monkey D. Luffy'
  })
});

module.exports = router;
