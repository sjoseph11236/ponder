const router = require('express').Router();
const { Annotation, Feed } = require('../db');

router.get('/', async(req, res, next) => {
  try {
    const annotations = await Annotation.findAll();
    res.send(annotations);
  } catch (error) {
    console.log('This is error is from GET annotations ', error);
    next(error);
  }
})

// GET /api/annotations/:comboId/feed
router.get('/:comboId/feed', async(req, res, next) => {
  try {
    const comboId = req.params.comboId
    const foundComboAnnotations = await Feed.findAll({
      where : { 
        comboId
      }
    });

    let foundAnnotations = []
    
    // Have to use foor loop instead of forEach possibley because of Async/await
    for(let i = 0; i < foundComboAnnotations.length; i++) {
      let annotation = foundComboAnnotations[i];
      const foundAnnotation = await Annotation.findByPk(annotation.annotationId);
      foundAnnotations.push(foundAnnotation);
    }

    if(!foundAnnotations.length) res.status(404).send('No annotations found');

    res.json(foundAnnotations);
  } catch (error) {
    console.error('This error is coming from GET /:comboId/feed ', error);
    next(error);
  }

})

module.exports = router;