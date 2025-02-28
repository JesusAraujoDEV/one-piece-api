const express = require('express');
const FrutasService = require('./../services/frutas_service');
const validatorHandler = require('./../middlewares/validator_handler');
const { createFrutaSchema, updateFrutaSchema, getFrutaSchema } = require('./../schemas/frutas_schema');

const service = new FrutasService();

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Frutas
 *   description: Endpoints para gestionar frutas
 */

/**
 * @swagger
 * /frutas:
 *   get:
 *     summary: Obtener todas las frutas
 *     tags: [Frutas]
 *     responses:
 *       200:
 *         description: Lista de frutas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 */

router.get('/', async (req, res) => {
  const frutas = await service.find();
  res.json(frutas);
});

/**
 * @swagger
 * /frutas/{id}:
 *   get:
 *     summary: Obtener una fruta por ID
 *     tags: [Frutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fruta
 *     responses:
 *       200:
 *         description: Fruta encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *       404:
 *         description: Fruta no encontrada
 */
router.get('/:id' ,
  validatorHandler(getFrutaSchema, 'params'),
  async (req, res, next) => {
    try{
      const { id } = req.params
      const fruta = await service.findOne(id);
      res.json(fruta);
    } catch(error){
      next(error);
    }
  }
);

/**
 * @swagger
 * /frutas:
 *   post:
 *     summary: Crear una nueva fruta
 *     tags: [Frutas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gomu Gomu no Mi
 *               type:
 *                 type: string
 *                 enum: [paramecia, logia, zoan]
 *                 example: paramecia
 *               price:
 *                 type: number
 *                 example: 5000000
 *     responses:
 *       201:
 *         description: Fruta creada
 *       400:
 *         description: Datos inválidos
 */
router.post('/',
  [
    validatorHandler(createFrutaSchema, 'body')
  ],
  async (req, res, next) => {
    try{
      const body = req.body;
      const fruta = await service.create(body);
      res.status(201).json({
        message: 'created',
        data: fruta
      })
    }
    catch(error){
      next(error);
    }
  }
);

/**
 * @swagger
 * /frutas/{id}:
 *   patch:
 *     summary: Actualizar una fruta
 *     tags: [Frutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fruta a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Fruta actualizada
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Fruta no encontrada
 */
router.patch('/:id',
  [
    validatorHandler(getFrutaSchema, 'params'),
    validatorHandler(updateFrutaSchema, 'body')
  ],
  async (req, res, next) => {
  try{
    const { id } = req.params
    const body = req.body;
    const fruta = await service.update(id, body);
    res.json({
      message: 'Updates',
      data: fruta
    })
  } catch (error){
    next(error);
  }
});

/**
 * @swagger
 * /frutas/{id}:
 *   delete:
 *     summary: Eliminar una fruta por ID
 *     tags: [Frutas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fruta a eliminar
 *     responses:
 *       200:
 *         description: Fruta eliminada
 *       404:
 *         description: Fruta no encontrada
 */
router.delete('/:id', async (req, res) => {
  const { id } = req.params

  res.json(await service.delete(id));
});

module.exports = router;
