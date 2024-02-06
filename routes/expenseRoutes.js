const express = require('express');
const userAuthentication = require('../middlleware/auth')

const router = express.Router();

const expenseController = require("../controller/expenseController")

router.post('/addExpense',userAuthentication.userAuthentication,expenseController.addExpense);
router.get('/getExpense',userAuthentication.userAuthentication,expenseController.getExpense)
router.delete('/deleteExpense/:id',userAuthentication.userAuthentication,expenseController.deleteExpense)
router.get('/getDownload',userAuthentication.userAuthentication,expenseController.getDownloadhistory)

module.exports = router;