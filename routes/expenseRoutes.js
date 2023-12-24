const express = require('express');

const router = express.Router();

const expenseController = require("../controller/expenseController")

router.post('/addExpense',expenseController.addExpense);
router.get('/getExpense',expenseController.getExpense)
router.delete('/deleteExpense/:id',expenseController.deleteExpense)

module.exports = router;