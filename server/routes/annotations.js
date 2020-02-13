const router = require('express').Router();
const { Annotation } = require('../db');

router.get('/', async(req, res, next) => {
  try {
    const annotations = await Annotation.findAll();
    res.send(annotations);
  } catch (error) {
    console.log('This is error is from GET annotations ', error);
    next(error);
  }
})

module.exports = router;