const Sequelize = require('sequelize');
const db = require('../db');
const { Op } = require('sequelize');
const { Combo } = require('../index');

const Media = db.define('media', { 
  title: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  }, 
  artist: { 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  }, 
  description: { 
    type: Sequelize.TEXT,
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  }, 
  url:{ 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true
    }
  },
  imageUrl:{ 
    type: Sequelize.STRING,
    allowNull: false,
    validate: { 
      notEmpty: true
    },
    defaultValue: 'https://amerikicklanghorne.com/wp-content/uploads/2017/04/default-image.jpg'
  }
});

Media.filterByKeyword = async (keyword) => {
  try {
    const filteredByKeywordInDescription = await Media.findAll({
      where: { 
        description: {
          // Op.iLike makes the keyword case insentive
          [Op.iLike]: `%${keyword}%`
        }
      }
    })

    return filteredByKeywordInDescription;

  } catch (error) {
    console.log('This error is coming from class method in filterByKeyword ', error );
  }
};

Media.makeCombo = filteredMedia => {
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

module.exports = Media;