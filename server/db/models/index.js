const Sequelize = require('sequelize');
const db = require('../db');

const Media = db.define('media', { 
  title: { 
    type: Sequelize.STRING,
    allowNull: false
  }, 
  artist: { 
    type: Sequelize.STRING,
    allowNull: false
  }, 
  descritption: { 
    type: Sequelize.TEXT,
    allowNull: false
  }, 
  url:{ 
    type: Sequelize.STRING,
    allowNull: false
  }
});


module.exports = Media;