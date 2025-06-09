const express = require('express');

const OrdersService = require('./../services/order_service');
const validatorHandler = require('./../middlewares/validator_handler');
const { createOrderSchema, updateOrderSchema, getOrderSchema, addItemSchema } = require('./../schemas/order_schema');
const passport = require('passport');

const router = express.Router();
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  //validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = {
        userId: req.user.sub
      };
      const order = await service.create(body);
      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
    validatorHandler(addItemSchema, 'body'),
    async (req, res, next) => {
      try {
        const body = req.body;
        const newItem = await service.addItem(body);
        res.status(201).json(newItem);
      } catch (error) {
        next(error);
      }
    }
  );

router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const order = await service.update(id, body);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;