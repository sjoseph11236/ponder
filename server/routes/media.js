const router  = require('express').Router();
const { Media } = require('../db');

router.get('/', async (req, res, next) => { 
  try {
    const media = await Media.findAll();
    res.send(media);
  } catch (error) {
    console.log('error from GET route in /media ', error);
    next(error)
  }
});

router.get('/combo', async (req, res, next) => {
  try {
    const filteredMedia = await Media.filterByKeyword('America')
    console.log("TCL: filteredMedia ", filteredMedia )
    const length = await Media.selectRandomMedia(filteredMedia);
    res.json(length)
  } catch (error) {
    console.log('error from combo GET route in media ', error);
    next(error);
  }
});


module.exports = router;