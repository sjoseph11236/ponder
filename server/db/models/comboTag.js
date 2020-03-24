const Sequelize = require('sequelize');
const db  = require('../db');

const ComboTag = db.define('comboTag', {
  comboId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tagId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});


ComboTag.tagCombos = async (combos,tag) => {
  try {
    let taggedCombos = []
    for(let i = 0; i < combos.length; i++) {
      let combo = combos[i];
      const [ taggedCombo ]= await ComboTag.findOrCreate({ 
        where: { comboId: combo.id, tagId: tag.id} 
      });
      taggedCombos.push(taggedCombo);
    }
    return taggedCombos;
  } catch (error) {
    console.error(error);
  }

}

module.exports = ComboTag;