const express = require('express')
const router = express.Router();

const forgotPasswordController = require('../controller/forgotPassword');

router.post('/forgotpassword' , forgotPasswordController.postEmailFromFrontend)
router.get('/resetpassword/:id',forgotPasswordController.resetpassword)
router.get('/updatepassword',forgotPasswordController.updatepassword)

module.exports = router