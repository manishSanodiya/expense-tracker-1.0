const db = require('../model/index');
const  User = db.users;
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


function stringValidator(string){
    if(string==undefined || string.length==0){
        return true
    }else{
        return false
    }
}

function generateAccessToken(id){
    return jwt.sign({userId:id},"SEcretPrivateKey")
}

const addUser = async (req,res)=>{
    try{
        const {username,email,password} = req.body;
        if(stringValidator(username)||stringValidator(email)||stringValidator(password)){
            return res.status(400).json({err:"invalid input value"})
        }
        const saltrounds = 10;
        bcrypt.hash(password,saltrounds, async(err, hash)=>{
      
            const newUser = await User.create({username,email,password:hash});
            res.status(201).send(newUser).json({message:"account created successfully"})
        })
    }catch(error){
        res.status(500).json({error: error.message});
    }
}

const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(stringValidator(email)||stringValidator(password)){
            return res.status(400).json({err:"invalid input value",})
        }
        
        const user = await User.findAll({where:{email}})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,(err,response)=>{
                if(err){
                   throw new Error( 'something went wrong')
                }
                if(response===true){
                    res.status(200).json({success : true, message:"user logged in successfully",token:generateAccessToken(user[0].id)})
                }else{
                    return res.status(500).json({success : false, message: "password is incorrrect"});
                }
            })
          
        }else{
            return res.status(404).json({success : false, message:"user doesnt exist"})
        }
    }catch(error){
        console.error( error.message)
    }

    }



module.exports = {
    addUser,
    login
}