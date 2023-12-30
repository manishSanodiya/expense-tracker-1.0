const express = require('express')
const router = express.Router();

const userAuthentication = require('../middlleware/auth')

const premiumController = require('../controller/premiumFeature');

router.get('/getPremium',userAuthentication.userAuthentication,premiumController.getUserLeaderBoard)

module.exports = router;
