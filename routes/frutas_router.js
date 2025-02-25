const express = require('express');
const FrutasService = require('./../services/frutas_service');
const service = new FrutasService();

const router = express.Router();

router.get('/', (req, res) => {
  const frutas = service.find();
  res.json(frutas);
});

router.get('/:id' , (req, res) => {
  const { id } = req.params
  const fruta = service.findOne(id);
  res.json(fruta);
});

router.post('/', (req, res) => {
  const body = req.body;
  const fruta = service.create(body);
  res.status(201).json({
    message: 'created',
    data: fruta
  })
});

router.patch('/:id', (req, res) => {
  const { id } = req.params
  const body = req.body;
  const fruta = service.update(id, body);
  res.json({
    message: 'Updates',
    data: fruta
  })
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  res.json(service.delete(id));
})

module.exports = router;
