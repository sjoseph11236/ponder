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
    const comboId = req.params.comboId;
    
    const foundAnnotations = await Feed.findComboAnnotations(comboId);

    if(!foundAnnotations.length) {
      res.status(404).send('No annotations found');
    }
    else { 
      res.send(foundAnnotations);
    }
  } catch (error) {
    console.error('This error is coming from GET /:comboId/feed ', error);
    next(error);
  }

});

// POST /api/annotations/:comboId/feed
router.post('/:comboId/feed', async (req, res, next ) => {
  try {
    const info = req.body.text;
    const comboId = req.params.comboId;
    const storedAnnoation =  await Annotation.create({
      info
    });

    const storedFeed = await Feed.create({
      annotationId: storedAnnoation.id,
      comboId,
    })
  
    const foundAnnotations = await Feed.findComboAnnotations(comboId);    

    res.send(foundAnnotations);
  } catch (error) {
    console.error('This error is coming from POST /:comboId ', error );
    next(error);   
  }
});


module.exports = router;