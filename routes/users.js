const express = require('express');
const passport = require('passport');
const router = express.Router();
console.log('loded');
const user_controller = require('../controller/user_controller');
router.get('/profile',passport.checkAuthentication,user_controller.profile);
router.get('/signin',user_controller.signin);
router.get('/signup',user_controller.signup);
router.post('/create',user_controller.create);

router.post('/createsession', passport.authenticate(
    'local',
    {failureRedirect: '/users/signin'},
), user_controller.createsession);
router.get('/sign-out',user_controller.destroysession);


module.exports = router;
