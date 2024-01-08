const express = require('express')
const router = express.Router();

const forgotPasswordController = require('../controller/forgotPassword');

router.post('/forgotpassword' , forgotPasswordController.postEmailFromFrontend)

module.exports = router