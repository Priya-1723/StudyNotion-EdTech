const express = require("express")
const router = express.Router()

const {sendOTP} = require("../controllers/Auth")
const {
    signUp,
    login,
    changePassword
} = require("../controllers/Auth")

const {
    resetPasswordToken,
    resetPassword
} = require("../controllers/ResetPassword")

const { auth } = require("../middlewares/auth")

router.post("/login", login)
router.post("/signup",  signUp)
router.post("/sendOTP", sendOTP)
router.post("/changePassword", auth, changePassword)

router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

module.exports = router