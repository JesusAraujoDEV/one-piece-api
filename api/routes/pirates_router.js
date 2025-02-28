const express = require('express');
const PiratesService = require('./../services/pirates_service');
const service = new PiratesService();

const router = express.Router();

router.get('/', (req, res) => {
  const pirates = service.find();
  res.json(pirates);
});

router.get('/filter' , (req, res) => {
  res.send('Filtrando piratas');
});

router.get('/:id' , (req, res) => {
  const { id } = req.params;
  const pirate = service.findOne(id);
  res.json(pirate);
});

module.exports = router;
