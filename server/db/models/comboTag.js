const Sequelize = require('sequelize');
const db  = require('../db');

const comboTag = db.define('comboTag', {
  comboId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tagId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = comboTag;