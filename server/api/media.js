const router  = require('express').Router();
const { Media, Combo, Tag, ComboTag, MediaTag } = require('../db');

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
    };
    
    res.send(finalCombo);
  } catch (error) {
    console.log(error);
    next(error)
  }
})

// GET all media by the searched word: 
// GET /api/media/:word
router.get('/:word', async (req, res, next) => { 
  try {
    const word = req.params.word;
    
    const tag = await Tag.findOne({ where: { word } });

    if(tag) { 
      const associatedMedia = await MediaTag.findAll({
        where: { tagId: tag.id }
      });

      // Need more media with tag from description route
      if(associatedMedia.length < 2) res.send({});

      // Find all media by id.
      const media = await Media.findAssociatedMedia(associatedMedia);
      // Send combo to create combo with word
      res.send(media);
    }
    else {
      // this response leads to checking the description
      res.send([]);
    }
  } catch (error) {
    console.log(error);
    next(error)
  }
});

// GET all media with the searched word in description: 
// GET /api/media/description/:word
router.get('/description/:word', async (req, res, next) => { 
  try {
    const word = req.params.word;
    const media = await Media.filterByKeyword(word);
    
    if(media.length < 2) {
      // This  response leads to checking youtube api.
      res.send([]);
    }
    else {
      // Create new Tag from word found in description
      const newTag = await Tag.create({ word });
      // assign Tag to media 
      const addMediaTags = await MediaTag.assignTag(media, newTag);
      // send media to create a combo with word
      res.send(media);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// This route is creating a new Combo from tags already in the database 
// POST /api/media/combo/:word
router.post('/combo/:word', async (req, res, next) => {
  try {
    const word = req.params.word;
    const media = req.body;
    // First look for word in tags
    // Find word in Tag table
    const tag = await Tag.findOne({where: { word }});

    // create a new unique pair
    const possibleCombos = await Combo.makeCombo(media);

    if(possibleCombos.newCombo.length) { 
      let combo = possibleCombos.newCombo;
      const storedCombo =  await Combo.create({
        mediumId: combo[0].id,
        pairId: combo[1].id
      });

      await ComboTag.create({ comboId: storedCombo.id, tagId: tag.id});
    
      const finalCombo = { 
        id: storedCombo.id,
        combo
      };

      res.json(finalCombo);
    }
    else if(possibleCombos.exisited){
      let combos = possibleCombos.exisited;

      const storedCombos = ComboTag.tagCombos(combos, tag);

      const medium = await Media.findOne({
        where: { 
          id: combos[0].mediumId
        }
      });

      const pair = await Media.findOne({
        where: { 
          id: combos[0].pairId
        }
      });

      const finalCombo = { 
        id: combos[0].id,
        combo: [medium, pair]
      }

      res.json(finalCombo);
    }
    else { 
    // this response leads to checking the description
      res.send({});
    } 
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;