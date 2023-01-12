const express = require("express");
const router = express.Router();
const passport = require("passport");

const postControler = require("../controller/post_controller");


router.post("/create", passport.checkAuthentication, postControler.create);
router.get('/destroy/:id',passport.checkAuthentication,postControler.destroy);
module.exports = router;
