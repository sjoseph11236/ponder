const Sequelize = require('sequelize');
const db = require('../db');

const Annotation = db.define('annotation', { 
  info: { 
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: new Date()
  }
});


module.exports = Annotation;