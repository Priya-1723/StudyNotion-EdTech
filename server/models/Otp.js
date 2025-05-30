const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/EmailVerificationTemplate");


const OTPSchema = new mongoose.Schema({
    email: {
        type:String,
        required: true,
    },
    otp: {
        type:String,
        required: true,
    },
    createdAt: {
        type:Date,
        default: Date.now(),
        expires: 60 * 5,
    }
});

// Define a function to send emails
async function sendVerificationEmail (email, otp) {
    try{
        const mailResponse = await mailSender(
            email, 
            "Verification Email ", 
            emailTemplate(otp) 
        )
        console.log("Email send successfully", mailResponse.response);
        

    }catch(err){
        console.error("Error occured while sending email: ", err);
        throw err;
        
    }
}


OTPSchema.pre("save", async function(next){
    console.log("New document saved to database");
    // Only send an email when a new document is created
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;