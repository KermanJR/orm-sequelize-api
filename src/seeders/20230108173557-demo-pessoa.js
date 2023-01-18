'use strict';

const pessoas = require("../models/pessoas.js");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Pessoas', [{
      nome: "",
      ativo: "",
      email: "",
      role: "",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Pessoas', null, {})
  }
};
