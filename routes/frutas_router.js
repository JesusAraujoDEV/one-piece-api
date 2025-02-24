const express = require('express');
const { faker } = require('@faker-js/faker');

const router = express.Router();

router.get('/', (req, res) => {
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

router.get('/:id' , (req, res) => {
  const { id } = req.params
  if(id === '999'){
    res.status(404).json({
      message: 'not found',
    });
  } else{
    res.status(200).json({
      id,
      name: 'Gomu Gomu no Mi',
      type: 'Paramecia',
      user: 'Monkey D. Luffy'
    })
  }
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: 'created',
    data: body
  })
})

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body;
  res.json({
    message: 'created',
    data: body,
    id: id,
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  res.json({
    message: 'deleted',
    id: id,
  })
})

module.exports = router;
