const express = require('express');
const UsersService = require('./../services/users_service');
const validatorHandler = require('./../middlewares/validator_handler');
//const { createFrutaSchema, updateFrutaSchema, getFrutaSchema } = require('./../schemas/u');

const service = new UsersService();

const router = express.Router();

router.get('/', async (req, res, next) => {
  try{
    const users = await service.find();
    res.json(users);
  }catch(err){
    next(err);
  }
});

module.exports = router;
