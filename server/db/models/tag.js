const Sequelize = require('sequelize');
const db = require('../db');

const Tag = db.define('tag', { 
  word: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Tag;