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

    const foundAnnotations = []
    
    foundComboAnnotations.forEach( async annotation => { 
      const foundAnnotation = await Annotation.findByPK(annotation.annotationId);
      foundAnnotations.push(foundAnnotation);
    })

    res.send(foundAnnotations);
  } catch (error) {
    console.error('This error is coming from GET /:comboId/feed ', error);
    next(error);
  }

})

module.exports = router;