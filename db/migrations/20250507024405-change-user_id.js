'use strict';

const { DataTypes } = require('sequelize');
const { CustomerSchema , CUSTOMER_TABLE } = require('./../models/customer_model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
    });
  },

  async down (queryInterface, Sequelize) {
    //await queryInterface.removeColumn(CUSTOMER_TABLE, 'role');
  }
};
