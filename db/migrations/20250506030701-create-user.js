'use strict';

const { UserSchema, USER_TABLE } = require('./../models/user_model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
