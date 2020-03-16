const Sequelize = require('sequelize');
const db  = require('../db');

const MediaTag = db.define('mediaTag', {
  mediumId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tagId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = MediaTag;