const db = require('../model/index')
const User = db.users;
const Expense = db.expenses;
const sequelize = require('sequelize');

const getUserLeaderBoard = async(req,res)=>{
    try{
        const users = await User.findAll()
        const expenses = await Expense.findAll();
        
        const userAggregatedExpenses = {

        }
        expenses.forEach(expense => {
            if(userAggregatedExpenses[expense.userId]){
                userAggregatedExpenses[expense.userId] = userAggregatedExpenses[expense.userId]+ expense.price
            }else{
                userAggregatedExpenses[expense.userId] = expense.price
            }
           
        });
        var userLeaderboardDetails = [];
        users.forEach((user)=>{
            userLeaderboardDetails.push({name: user.username,total_cost:userAggregatedExpenses[user.id]||0})
        })
       userLeaderboardDetails.sort((a,b)=> b.total_cost-a.total_cost)
        console.log(userLeaderboardDetails);
        res.status(200).json(userLeaderboardDetails)
    }catch(err){
        console.log('error in leaderbord fetch ',err)
        res.status(500).json(err)
    }
}


module.exports={
    getUserLeaderBoard
}
