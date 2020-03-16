const router = require('express').Router();

router.use('/annotations', require('./annotations'));
router.use('/media', require('./media'));

module.exports = router;