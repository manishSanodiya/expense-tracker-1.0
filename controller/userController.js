const db = require('../model/index');
const  User = db.users;

const addUser = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
       
            const newUser = await User.create({username,email,password});
            res.status(201).send(newUser);
        
    
    }catch(error){
        res.status(500).json({error: error.message});
    }
}


module.exports = {
    addUser,
}