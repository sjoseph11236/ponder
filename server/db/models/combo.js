const Sequelize = require('sequelize');
const db = require('../db');
const Media  = require('../models/media');

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
  try {
    const gotMedia = await Media.findByPk(combo.mediumId);
    const gotPair = await Media.findByPk(combo.pairId);
    const media = [gotMedia, gotPair];
    
    return media;
  } catch (error) {
    console.log('error from combo model getComboMedia ', error);
  }
}

module.exports = Combo; 