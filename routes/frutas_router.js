const express = require('express');
const FrutasService = require('./../services/frutas_service');
const service = new FrutasService();

const router = express.Router();

router.get('/', async (req, res) => {
  const frutas = await service.find();
  res.json(frutas);
});

router.get('/:id' , async (req, res, next) => {
  try{
    const { id } = req.params
    const fruta = await service.findOne(id);
    res.json(fruta);
  } catch(error){
    next(error);
  }
});

router.post('/', async (req, res) => {
  const body = req.body;
  const fruta = await service.create(body);
  res.status(201).json({
    message: 'created',
    data: fruta
  })
});

router.patch('/:id', async (req, res) => {
  try{
    const { id } = req.params
    const body = req.body;
    const fruta = await service.update(id, body);
    res.json({
      message: 'Updates',
      data: fruta
    })
  } catch (error){
    res.status(404).json({
      message: error.message
    })
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  res.json(await service.delete(id));
});

module.exports = router;
