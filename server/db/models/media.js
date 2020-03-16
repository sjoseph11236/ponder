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
  },
  type: {
    type: Sequelize.ENUM('movie', 'music'),
    allowNull: false
  }
});

Media.formatYoutubeData = (data) => { 
  try {
    console.log('data is ', data);
  } catch (error) {
    console.log('This error is coming from class method in formatYoutubeData', error );
  }
}

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


module.exports = Media;