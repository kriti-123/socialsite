// const express = require('express');
// const router = express.Router();
// console.log('loded');
// // const homeController = require('../controller/homr_controller');

// const homeController = require('../controller/home_controller');

// router.get('/',homeController.home);
// // router.use('/',homeController.layout);
// router.use('/users',require('./users'));
// router.use('/posts',require('./posts'));
// router.use('/comments',require('./comments'));
// router.use('/likes',require('./likes'));
// router.use('/api',require('./api'));
// module.exports = router;
const express = require('express');
const router = express.Router();
console.log('loded');
// const homeController = require('../controller/homr_controller');

const homeController = require('../controller/home_controller');

router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));
router.use('/likes',require('./likes'));
router.use('/api',require('./api'));
module.exports = router;