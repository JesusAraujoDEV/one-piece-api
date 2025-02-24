const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('HOLA MUNDOOOO, primer get en express')
});

app.get('/nueva-ruta', (req, res) => {
  res.send('HOLA MUNDOOOO, una nueva ruta')
});

app.get('/frutas', (req, res) => {
  res.json([
    {
      name: 'Gomu Gomu no Mi',
      type: 'Paramecia',
      user: 'Monkey D. Luffy'
    },
    {
      name: 'Ope Ope no Mi',
      type: 'Paramecia',
      user: 'Trafalgar D. Water Law'
    }
  ])
});

app.get('/frutas/:id' , (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Gomu Gomu no Mi',
    type: 'Paramecia',
    user: 'Monkey D. Luffy'
  })
})

app.get('/pirates', (req, res) => {
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

app.get('/pirates/filter' , (req, res) => {
  res.send('Filtrando piratas');
});

app.get('/pirates/:id' , (req, res) => {
  const { id } = req.params
  res.json({
    id,
    name: 'Gomu Gomu no Mi',
    type: 'Paramecia',
    user: 'Monkey D. Luffy'
  })
});

app.get('/crews/:crewId/pirates/:pirateId', (req, res) => {
  const { crewId, pirateId } = req.params
  res.json({
    crewId,
    pirateId,
    name: 'Monkey D. Luffy',
    age: 19,
    bounty: 1500000000,
  })
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if(limit && offset) {
    res.json(
      {
        limit,
        offset
      }
    )
  } else{
    res.json('No hay limit ni offset');
  }
});



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})
