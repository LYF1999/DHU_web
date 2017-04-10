const router = require('express').Router();
const blogViews = require('./views');

router.get('/', blogViews.index);
router.get('/test', blogViews.testPost);

module.exports = router;
