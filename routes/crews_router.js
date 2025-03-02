const express = require('express');
const CrewsService = require('./../services/crews_service');
const validatorHandler = require('./../middlewares/validator_handler');
const { createFrutaSchema, updateFrutaSchema, getFrutaSchema } = require('./../schemas/crews_schema');

const service = new FrutasService();

const router = express.Router();
