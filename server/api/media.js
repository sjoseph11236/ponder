const router  = require('express').Router();
const { Media, Combo } = require('../db');

// GET /api/media
router.get('/', async (req, res, next) => { 
  try {
    const media = await Media.findAll();
    res.send(media);
  } catch (error) {
    console.log('error from GET route in /media ', error);
    next(error)
  }
});

// GET /api/media/combo
router.get('/combo', async (req, res, next ) => {
  try {
    // A built in method to find the total count of combo model. 
    const { count } = await Combo.findAndCountAll();
    const combo = await Combo.findByPk(count);
    const comboMedia = await Combo.getComboMedia(combo);
    const finalComboMedia = {
      id: combo.id, 
      combo: comboMedia
    }
    res.send(finalComboMedia);
  } catch (error) {
    console.log('error from GET route in /media/combo ', error);
    next(error)
  }
});

// GET /api/media/:comboId/next
router.get('/:comboId/next', async (req, res, next ) => {
  try {
    const currentComboId = req.params.comboId;
    let nextCombo = currentComboId  - 1; 
    if(nextCombo < 1) nextCombo = 1;
  
    const combo = await Combo.findByPk(nextCombo);
    const comboMedia = await Combo.getComboMedia(combo);
    const finalCombo = { 
      id: combo.id,
      combo: comboMedia
    }
    
    res.send(finalCombo);
  } catch (error) {
    console.log('error from GET route in /media/combo/next ', error);
    next(error)
  }
})

// POST /api/media/combo/:word
router.post('/combo/:word', async (req, res, next) => {
  try {
    const filteredMedia = await Media.filterByKeyword(req.params.word)
    
    if(filteredMedia.length === 1) return res.status(404).send('choose a new keyword');
    
    const combo = await Combo.makeCombo(filteredMedia);
    
    const storedCombo =  await Combo.findOrCreate({
      where: {
        mediumId: combo[0].id,
        pairId: combo[1].id
      }
    });

    // TO DO: Create a class method in Tag to create a tag ro find a tag for a storedCombo
    // set the tag to each media in mediaTag model
  
    const finalCombo = { 
      id: storedCombo[0].id,
      combo
    }

    res.json(finalCombo);

  } catch (error) {
    console.log('error from combo GET route in media ', error);
    next(error);
  }
});

module.exports = router;