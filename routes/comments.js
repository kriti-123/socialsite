const express = require('express');
const router = express.Router();
const passport = require('passport');

const commentsControler = require('../controller/comment_controler');

router.post('/create',passport.checkAuthentication,commentsControler.create);
router.get('/destroy/:id',passport.checkAuthentication,commentsControler.destroy);
module.exports = router;