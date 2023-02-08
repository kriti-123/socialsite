const userAPI = require('../../../controller/api/v1/user_api');
const express = require('express');
const router = express.Router();
router.post('/create-session',userAPI.createsession);
module.exports = router;