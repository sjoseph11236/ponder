const Sequelize = require('sequelize');
const db  = require('../db');
const  Annotation = require('../models/annotation');

const Feed = db.define('feed', {
  annotationId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  comboId: { 
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Feed.findComboAnnotations =  async comboId => {
  try {
    const foundComboAnnotations = await Feed.findAll({
      where : { 
        comboId
      }
    });
  
  
    let foundAnnotations = [];
    
    // Have to use foor loop instead of forEach possibley because of Async/await
    for(let i = 0; i < foundComboAnnotations.length; i++) {
      let annotation = foundComboAnnotations[i];
      const foundAnnotation = await Annotation.findByPk(annotation.annotationId);
      foundAnnotations.push(foundAnnotation);
    }
  
    return foundAnnotations;
  } catch (error) {
    console.log('This error is coming from class method in findComboAnnotations ', error );
  }

}

module.exports = Feed;