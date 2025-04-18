const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.set('debug', true);
    mongoose.connect(process.env.MONGODB_URL, {
        
    }) 
    .then (() => console.log("DB connected Successfully"))
    .catch((err) => {
        console.log("DB connection failed");
        console.error(err);
        process.exit(1);
    })
}