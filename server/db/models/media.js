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

Media.findAssociatedMedia = async associatedMedia => { 

  try {
    const media = [];
    
    for(let i = 0; i < associatedMedia.length; i++) {
      let medium = associatedMedia[i];
      let gotMedium = await Media.findByPk(medium.mediumId);
      media.push(gotMedium);
    }

    return media;
  } catch (error) {
    console.log(error);    
  }
}

Media.formatYoutubeData = (data, type) => { 
  try {
    const formatedData = data.map(datum => {
      return { 
        title: datum.snippet.title,
        artist: datum.snippet.artist || null,
        type,
        description: datum.snippet.description,
        url: `https://www.youtube.com/embed/${datum.id.videoId}`,
        imageUrl: datum.snippet.thumbnails.default.url
      }
    })

    return formatedData;
  } catch (error) {
    console.log(error);
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
    console.log( error );
  }
};


module.exports = Media;