const Sequelize = require('sequelize');
const db  = require('../db');

const Feed = db.define('feed', {
  annotationId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comboId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});


module.exports = Feed;