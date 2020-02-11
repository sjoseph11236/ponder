const Sequelize = require('sequelize');
const db = require('../db');

const Annotation = db.define('annotation', { 
  info: { 
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: Sequelize.DATE
});

module.exports = Annotation;