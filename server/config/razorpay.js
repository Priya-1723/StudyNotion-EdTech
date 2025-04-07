const Razoprpay = require("razorpay")
require("dotenv").config()


exports.instance = new Razoprpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
})