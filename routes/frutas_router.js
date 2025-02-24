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
  res.json({
    id,
    name: 'Gomu Gomu no Mi',
    type: 'Paramecia',
    user: 'Monkey D. Luffy'
  })
});

module.exports = router;
