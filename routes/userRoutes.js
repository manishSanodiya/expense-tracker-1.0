const express = require('express');
const userAuthentication = require('../middlleware/auth')
const router = express.Router();

const userController = require('../controller/userController');
const expenseController = require('../controller/expenseController')

router.post('/addUser',userController.addUser);
router.post('/login',userController.login)

router.get('/download',userAuthentication.userAuthentication,expenseController.downloadexpense)

module.exports = router;