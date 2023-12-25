const jwt = require('jsonwebtoken');
const db = require('../model/index');
const User = db.users;

const secretKey = "SEcretPrivateKey";
const userAuthentication = async(req,res,next)=>{
    try{
        const token = req.header("Authorization");
        console.log("token ",token);
        const verify =jwt.verify(token,secretKey);
        console.log("user Id >>>>>>>>",verify.userId);
       const user= await User.findByPk(verify.userId)
           
            req.user = user;
            next();
       
    }catch(err){
        console.log(err);
        return res.status(401).json({success:false})
    }
}

module.exports={
    userAuthentication
}