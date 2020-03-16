const router = require('express').Router();

router.use('/annotations', require('./annotations'));
router.use('/media', require('./media'));
router.use('/youtube', require('./youtube'));

module.exports = router;