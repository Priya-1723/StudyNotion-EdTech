
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const bcrypt = require("bcrypt")
const crypto = require("crypto")

//  reset password token
exports.resetPasswordToken = async (req, res) =>{
    try{
        // get email from req body
        const email = req.body.email

        // email validation
        const user = await User.findOne({email: email});
        if(!user){
            return res.json({
                success: false,
                message: "Your email is not registered"
            })
        }

        // generate token
        const token = crypto.randomUUID();

        // update user by adding token and expiration
        const updatedDetails = await User.findOneAndUpdate(
        {email: email}, 
        {
            token,
            resetPasswordExpires: Date.now() + 5*60*1000,
        },
        {new: true}
        )
        console.log("DETAILS", updatedDetails);

        // create url
        const url = `http://localhost:3000/update-password/${token}`

        // send mail containing the url
        await mailSender(
            email, 
            "Password Reset", 
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )

        // return res
        return res.json({
            success: true,
            message: 'Email Sent Successfully, Please Check Your Email to Continue Further'
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while reset password'
        })
    }

}


// Reset password 
exports.resetPassword = async (req, res) => {
    try{
        //  fetch data
        const {password, confirmPassword, token} = req.body;

        //  validation
        if(password !== confirmPassword){
            return res.json({
                success: false,
                message: 'Passwords are not matching'
            })
        }

        // get user details from db using token
        const userDetails = await User.findOne({token : token});
        // if no entry - invalid token
        if(!userDetails){
            return res.json({
                success: false,
                message: 'Token is Invalid'
            })
        }

        // check token time
        if(userDetails.resetPasswordExpires < Date.now() ){
            return res.json({
                success: false,
                message: 'token is expired, Please regenerate token'
            })
        }

        // hash password
        const encryptedPassword = await bcrypt.hash(password, 10)

        // update password
        await User.findOneAndUpdate(
            {token: token},
            {password: encryptedPassword},
            {new: true}
        )

        // return res
        return res.status(200).json({
            success: true,
            message: "Password Reset successfully"
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while reset password"
        })
    }
}