const router  = require('express').Router();
const { Media, Combo } = require('../db');

router.get('/', async (req, res, next) => { 
  try {
    const media = await Media.findAll();
    res.send(media);
  } catch (error) {
    console.log('error from GET route in /media ', error);
    next(error)
  }
});


router.post('/combo/:word', async (req, res, next) => {
  try {
    const filteredMedia = await Media.filterByKeyword(req.params.word)
    
    if(filteredMedia.length === 1) return res.status(404).send('choose a new keyword');
    
    const combo = await Media.makeCombo(filteredMedia);
    

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