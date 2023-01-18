'use strict';
const validator = require('validator');

module.exports = (sequelize, DataTypes) => {
  const Pessoas = sequelize.define('Pessoas', {
    nome: DataTypes.STRING,
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Por favor, insira em e-mail válido.'
        }
      }
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {});
  Pessoas.associate = function(models) {
    Pessoas.hasMany(models.Turmas, {
      foreignKey: 'docente_id'
    })
    Pessoas.hasMany(models.Matriculas, {
      foreignKey: 'estudante_id'
    })
  };
  return Pessoas;
};