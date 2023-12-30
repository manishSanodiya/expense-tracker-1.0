
const db = require('../model/index');

const User = db.users;
const Expense = db.expenses;
const sequelize = db.sequelize;

const getUserLeaderBoard = async(req,res)=>{
    try{
        const leaderboardOfUsers = await User.findAll({
            attributes: ['id','username',[sequelize.fn('sum',sequelize.col('expenses.price')),'total_cost']],
            include: [
               {
                 model: Expense,
                attributes: []
               }
            ],
            group: ['user.id'],
            order: [['total_cost','DESC']]
        })
         console.log(leaderboardOfUsers);
        res.status(200).json(leaderboardOfUsers)
    }catch(err){
        console.log('error in leaderbord fetch ',err)
        res.status(500).json(err)
    }
}


module.exports={
    getUserLeaderBoard
}
