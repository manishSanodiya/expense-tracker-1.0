
const express = require('express');
const userAuthentication = require('../middlleware/auth');

const purchaseController = require("../controller/purchase");

const router = express.Router();

router.get('/premiummembership',userAuthentication.userAuthentication,purchaseController.premiummembership)


module.exports = router;