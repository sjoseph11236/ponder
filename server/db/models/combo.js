const Sequelize = require('sequelize');
const db = require('../db');
const { Media } = require('../index');

const Combo = db.define('combo', {
  id: { 
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mediumId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  },
  pairId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Combo.getComboMedia = async combo => {

}

module.exports = Combo; 