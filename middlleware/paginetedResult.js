
const db = require('../model/index');
const User = db.users;



const pagination = async (req, res, next) => {
    try {
       const page = parseInt(req.query.page)
       const limit = parseInt(req.query.limit)
       const startIndex = (page-1)*limit
       const endIndex = page*limit
       const result = {}
  
        next();
    } catch (err) {
        console.error("Error in userAuthentication:", err);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = {
    pagination
};
