const router  = require('express').Router();
const { Media, Tag, Combo } = require('../db');

router.get('/', async (req, res, next) => { 
  try {
    const media = await Media.findAll();
    res.send(media);
  } catch (error) {
    console.log('error from GET route in /media ', error);
    next(error)
  }
});


router.get('/combo/:word', async (req, res, next) => {
  try {
    const foundTag = await Tag.findOne({
      where: {
        word: req.params.word
      }
    });


    
    const filteredMedia = await Media.filterByKeyword(foundTag.word)
    
    if(filteredMedia.length === 1) return res.status(404).send('choose a new keyword');
    
    const combo = await Media.makeCombo(filteredMedia);
    

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
    console.log('error from combo GET route in media ', error);
    next(error);
  }
});

// router.get('/combo/random', async (req, res, next) => {
//   try {
    
//   } catch (error) {
//     console.log('error from /combo/random  GET route in media ', error);
//     next(error);
//   }
// });

module.exports = router;