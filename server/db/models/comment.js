const Sequelize = require('sequelize');
const db = require('../db');

const Comment = db.define('comment', {
  info: { 
    type: Sequelize.TEXT,
    allowNull: false
  },
  date: Sequelize.DATE
});

module.exports = Comment;