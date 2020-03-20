const Sequelize = require('sequelize');
const db  = require('../db');

const MediaTag = db.define('mediaTag', {
  mediumId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  tagId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

MediaTag.assignTag = async (media, tag) => {
  try {
    const mediaTags = []

    for(let i = 0; i < media.length; i++) {
      let medium = media[i];
      let mediaTag = await MediaTag.create({mediumId: medium.id, tagId: tag.id});
      mediaTags.push(mediaTag);
    }

    return mediaTags;
  } catch (error) {
    console.error(error);
  }
}
module.exports = MediaTag;