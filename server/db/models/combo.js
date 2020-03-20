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
  try {
    const combos = [];
      
    for(let i = 0; i < associatedCombos.length; i++) {
      let combo = associatedCombos[i];
      let gotCombo = await Combo.findByPk(combo.comboId);
      combos.push(gotCombo);
    }
  
    return combos;
  } catch (error) {
    console.error(error);
  }
}

Combo.findAllMediaInCombo = async combos => { 
  try {
    const allfinalComboMedia = [];

    for(let j = 0; j < combos.length; j++) {
      let combo = combos[j];
      const comboMedia = await Combo.getComboMedia(combo);
      const finalComboMedia = Combo.finalComboMedia(combo, comboMedia);
      allfinalComboMedia.push(finalComboMedia);
    }

    return allfinalComboMedia;
  } catch (error) {
    console.error(error);
  }
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

Combo.makeCombo = async media => { 
console.log("media 74", media )
  try {
    let right = 0; 
    let left = media.length - 1; 
    let combo; 

    while(right < media.length - 1) {
      if(right == left){ 
        right++;
        left = media.length - 1;
      }
    
      const check1 = await Combo.findOne({where: { mediumId: media[right].id, pairId: media[left].id}})
      const check2 = await Combo.findOne({where: { mediumId: media[left].id, pairId: media[right].id}})
      
      if(right !== left) {
        if(check1 == null && check2 == null) {
          combo = [media[right], media[left]];
          break;
        }
      }
      left--;
    }

    return combo; 
  } catch (error) {
    
  }
}

module.exports = Combo; 