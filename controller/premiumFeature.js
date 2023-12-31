
const db = require('../model/index');

const User = db.users;
const Expense = db.expenses;
const sequelize = db.sequelize;

const getUserLeaderBoard = async(req,res)=>{
    try{
        const leaderboardOfUsers = await User.findAll({
            attributes: ['id','username','totalexpense'],
            order: [['totalexpense','DESC']]
        })
       
        res.status(200).json(leaderboardOfUsers)
    }catch(err){
        console.log('error in leaderbord fetch ',err)
        res.status(500).json(err)
    }
}


module.exports={
    getUserLeaderBoard
}
