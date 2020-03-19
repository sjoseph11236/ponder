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
Combo.findAssociatedCombos = async associatedCombos => { 
  const combos = [];
      
  for(let i = 0; i < associatedCombos.length; i++) {
    let combo = associatedCombos[i];
    let gotCombo = await Combo.findByPk(combo.comboId);
    combos.push(gotCombo);
  }

  return combos;
}

Combo.findAllMediaInCombo = async combos => { 
  const allfinalComboMedia = [];
  for(let j = 0; j < combos.length; j++) {
    let combo = combos[j];
    const comboMedia = await Combo.getComboMedia(combo);
    const finalComboMedia = Combo.finalComboMedia(combo, comboMedia);
    allfinalComboMedia.push(finalComboMedia);
  }
  return allfinalComboMedia;
}

Combo.finalComboMedia = (combo, comboMedia) => { 
  return {
    id: combo.id, 
    combo: comboMedia
  }
}
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

Combo.makeCombo = filteredMedia => {
  if(filteredMedia.length === 2 ) return filteredMedia;
  //Get the length
  const filteredMediaLength = filteredMedia.length;
  // Choose On randomIdx
  const randomIdx1 = Math.floor(Math.random() * filteredMediaLength);
  // Get th idx before it
  const randomIdx2 = Math.abs(randomIdx1 - 1);

  const combo = [filteredMedia[randomIdx1], filteredMedia[randomIdx2]];

  return combo;
}

module.exports = Combo; 