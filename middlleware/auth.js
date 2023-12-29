const jwt = require('jsonwebtoken');
const db = require('../model/index');
const User = db.users;

const secretKey = "SEcretPrivateKey";

const userAuthentication = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ success: false, message: "Authorization token not provided" });
        }

        const verified = jwt.verify(token, secretKey);
        const user = await User.findByPk(verified.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        console.log("<<<<<<<<<<<<<<<<<<<<<<<manis>>>>>>>>>>>>>>>>>>>>>")
        req.user = user;
        next();
    } catch (err) {
        console.error("Error in userAuthentication:", err);
        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = {
    userAuthentication
};
