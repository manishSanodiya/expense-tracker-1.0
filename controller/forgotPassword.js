const db = require('../model/index');
const User = db.users;
const Sib = require('sib-api-v3-sdk');
const dotenv = require('dotenv')
dotenv.config();
const client = Sib.ApiClient.instance;

client.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();


const postEmailFromFrontend = async(req,res)=>{
    try{
        const {email} = req.body;
        const sender = {
            email: 'samsamsamm722@gmail.com',
            name: 'from manish sanodiya'
        }
        const receivers = [
            {
                email: email
            }
        ]

   const mailresponse = await tranEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    subject: "Reset Your password",
    htmlContent: `
  <!DOCTYPE html>
    <html>
    <head>
        <title>Password Reset</title>
    </head>
    <body>
        <h1>Reset Your Password</h1>
        <p>Click the button below to reset your password:</p>
      
    </body>
    </html>`
})
console.log("form cntroller>>>>>>>>>>>>>>>>>>>>>")
res.status(200).json({ message: 'Password reset email sent',data:mailresponse });

        
    }catch(err){
        res.status(500).json(err)
    }

    
}


module.exports = {
    postEmailFromFrontend
}