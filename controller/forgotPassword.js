const db = require("../model/index");
const User = db.users;
const Forgotpassword = db.forgotpasswords;
const Sib = require("sib-api-v3-sdk");
const dotenv = require("dotenv");
const uuid = require("uuid");

// const Forgotpassword = require("../model/forgotPassword");
dotenv.config();
const client = Sib.ApiClient.instance;

client.authentications["api-key"].apiKey = process.env.SENDINBLUE_API_KEY;

const tranEmailApi = new Sib.TransactionalEmailsApi();

const postEmailFromFrontend = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      const id = uuid.v4();

      user.createForgotpassword({id,active: true}).catch(err=>{
        throw new Error("error in creating forgot pass database :", err)
      })

      const sender = {
        email: "samsamsamm722@gmail.com",
        name: "from manish sanodiya",
      };
      const receivers = [
        {
          email: email,
        },
      ];

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
          <p>Click the button below to reset your password: <a href="http://localhost:4600/api/password/resetpassword/${id}">Reset Password </a></p>
        
      </body>
      </html>`,
      });
      
      res
        .status(200)
        .json({
          message: "Password reset email sent",
          data: mailresponse,
          success: true,
        });
    } else {
      throw new Error("user doesnt exist");
    }
  } catch (err) {
    res.status(500).json({ message: err, success: false });
  }
};

const resetpassword = (req, res) => {
 try{ const id = req.params.id;
  console.log("<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>",id);
  // const users = await Forgotpassword.findAll({where: {id}})
  // console.log(users)
 Forgotpassword.findOne({ where: { id } }).then((forgotpasswordrequest) => {

    if (forgotpasswordrequest) {
      forgotpasswordrequest.update({ active: false });
      res.status(200).send(`<html>
                                  <script>
                                      function formsubmitted(e){
                                          e.preventDefault();
                                          console.log('called')
                                      }
                                  </script>

                                  <form action="api/password/updatepassword/${id}" method="get">
                                      <label for="newpassword">Enter New password</label>
                                      <input name="newpassword" type="password" required></input>
                                      <button>reset password</button>
                                  </form>
                              </html>`);
      res.end();
    }else{
      res.json({message: 'id not found'})
    }
  });
}
catch (err) {
  res.status(500).json({ message: err, success: false });
}
};

const updatepassword = (req, res) => {
  try {
    const { newpassword } = req.query;
    const { resetpasswordid } = req.params;
    Forgotpassword.findAll({ where: { id: resetpasswordid } }).then(
      (resetpasswordrequest) => {
        User.findOne({ where: { id: resetpasswordrequest.userId } }).then(
          (user) => {
          
            if (user) {
     

              const saltRounds = 10;
              bcrypt.genSalt(saltRounds, function (err, salt) {
                if (err) {
                  console.log(err);
                  throw new Error(err);
                }
                bcrypt.hash(newpassword, salt, function (err, hash) {
          
                  if (err) {
                    console.log(err);
                    throw new Error(err);
                  }
                  user.update({ password: hash }).then(() => {
                    res
                      .status(201)
                      .json({ message: "Successfuly update the new password" });
                  });
                });
              });
            } else {
              return res
                .status(404)
                .json({ error: "No user Exists", success: false });
            }
          }
        );
      }
    );
  } catch (error) {
    return res.status(403).json({ error, success: false });
  }
};

module.exports = {
  postEmailFromFrontend,
  resetpassword,
  updatepassword
};
