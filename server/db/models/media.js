const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');

const Media = db.define('media', { 
  title: { 
    type: Sequelize.STRING,
    allowNull: false
  }, 
  artist: { 
    type: Sequelize.STRING,
    allowNull: false
  }, 
  description: { 
    type: Sequelize.TEXT,
    allowNull: false
  }, 
  url:{ 
    type: Sequelize.STRING,
    allowNull: false
  },
  imageUrl:{ 
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg'
  }
});

Media.filterByKeyword = async (keyword) => {
  try {
    const filteredByKeywordInDescription = await Media.findAll({
      where: { 
        description: {
          [Op.like]: `%${keyword}%`
        }
      }
    })

    return filteredByKeywordInDescription;

  } catch (error) {
    console.log('This error is coming from class method in filterByKeyword ', error )
  }
};

Media.selectRandomMedia = (filteredMedia) => {
  if(filteredMedia.length === 2 ) return filteredMedia;
  //Get the length
  const filteredMediaLength = filteredMedia.length;
  // Choose On randomIdx
  const randomIdx1 = Math.floor(Math.random() * filteredMediaLength);
  // Get the randomIdx before it
  const randomIdx2 = Math.abs(randomIdx1 - 1);

  return [filteredMedia[randomIdx1], filteredMedia[randomIdx2], randomIdx1, randomIdx2];
}

module.exports = Media;