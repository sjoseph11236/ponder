const router  = require('express').Router();
const { Media, Combo, Tag, ComboTag } = require('../db');

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

// Find all combos with associated word
// GET /api/media/combos/:word
router.get('/combos/:word', async (req, res, next) => { 
  try {
    const word = req.params.word; 
    // Find word in Tag table
    const tag = await Tag.findOne({where: {word }});
    if(tag){
      // Find all comboIds associated with Combo
      const associatedCombos = await ComboTag.findAll({
        where:{
          tagId: tag.id
        }
      });
      
      // Find all combos by the id
      const combos = await Combo.findAssociatedCombos(associatedCombos);
      
      // Find all the media in each combo 
      const allfinalComboMedia = await Combo.findAllMediaInCombo(combos);


      res.send(allfinalComboMedia);
    }
    else { 
      // send an empty arr to look for tag in mediaTag or media description to then create combo;
      res.send([]);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// Route to load up last combo in table
// GET /api/media/combo
router.get('/combo', async (req, res, next ) => {
  try {
    // A built in method to find the total count of combo model. 
    const { count } = await Combo.findAndCountAll();
    const combo = await Combo.findByPk(count);
    console.log('combo', combo);
    const comboMedia = await Combo.getComboMedia(combo);
    const finalComboMedia = Combo.finalComboMedia(combo, comboMedia);
    res.send(finalComboMedia);
  } catch (error) {
    console.log(error);
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
    console.log(error);
    next(error)
  }
})

// POST /api/media/combo/:word
router.post('/combo/:word', async (req, res, next) => {
  try {
    const word = req.params.word;
    // First look for word in tags
    // Find word in Tag table
    const tag = await Tag.findOne({where: {word }});
    console.log('tag',tag)

    const filteredMedia = await Media.filterByKeyword(word)
    
    if(filteredMedia.length === 1) return res.status(404).send('choose a new keyword');
    
    const combo = await Combo.makeCombo(filteredMedia);
    
    const storedCombo =  await Combo.findOrCreate({
      where: {
        mediumId: combo[0].id,
        pairId: combo[1].id
      }
    });

    const finalCombo = { 
      id: storedCombo[0].id,
      combo
    }

    res.json(finalCombo);

  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;