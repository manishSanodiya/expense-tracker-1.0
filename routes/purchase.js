
const express = require('express');
const userAuthentication = require('../middlleware/auth');

const purchaseController = require("../controller/purchase");

const router = express.Router();

router.get('/premiummembership',userAuthentication.userAuthentication,purchaseController.premiummembership)

router.post('/updatetransaction',userAuthentication.userAuthentication,purchaseController.updatetransactionstatus)
module.exports = router;