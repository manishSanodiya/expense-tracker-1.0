
const db = require('../model/index')

const dotenv = require('dotenv');
const Razorpay = require('razorpay');
dotenv.config();
const Order = db.orders;
const key_id = process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;


const premiummembership = async (req, res, next) => {
    try {
        var rzp = new Razorpay({
            key_id: key_id,
            key_secret: key_secret
        });
        const amount = 3000;
        const options = {
            amount: amount,
            currency: "INR",
            receipt: "any unique id for every order",
        };

        rzp.orders.create(options, async (err, order) => {
            if (err) {
                console.log("Error creating order:", err);
                return res.status(500).json({ error: "Failed to create order" });
            }

            try {
                // Assuming req.user.createOrder is an asynchronous function
                await req.user.createOrder({ orderid: order.id, status: "PENDING" });
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (createOrderErr) {
                console.log("Error creating user order:", createOrderErr);
                return res.status(500).json({ error: "Failed to create user order" });
            }
        });
    } catch (err) {
        console.log("Error in premiummembership:", err);
        res.status(403).json({ message: "Something went wrong", error: err });
    }
};

const updatetransactionstatus = async (request, response, next) => {
    try {
         const { order_id, payment_id } = request.body;
    console.log("<<<<<<<<<<<<<<<<<<<<<<<manis>>>>>>>>>>>>>>>>>>>>>",request.body)

   
        const user = request.user;
        user.ispremiumuser = true;
        await Promise.all([
            user.save(),
            Order.update(
                { paymentid: payment_id, status: "Successful" },
                { where: { orderid: order_id }}
            )
        ])
        response.status(202).json({ success: true, message: "Thank youfor being a premium user" });
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, message: "Error updating transaction" });
    }
}

module.exports = {
 premiummembership,
 updatetransactionstatus
}