const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const {courseEnrollmentEmail} = require("../mail/CourseEnrollementEmail");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");
const { default: mongoose } = require("mongoose");
const crypto = require("crypto");
const CourseProgress = require("../models/CourseProgress");


exports.capturePayment = async(req, res) => {
    const {courses} = req.body; //Retrieves the courses array (IDs of courses the user wants to enroll in) from the request body.
    const userId = req.user.id; //Retrieves the userId from the authenticated user's data (req.user).

    //If no course IDs are provided, it immediately returns a failure response.
    if(courses.length === 0 ){
        return res.json({success: false, message : "Please provide course Id"})
    }

    let totalAmount  = 0 //Initializes a variable to keep track of the total price of all selected courses.

    //Loops through each course ID in the courses array.
    for(const course_id of courses) {
        let course;
        try{
            course = await Course.findById(course_id); //Fetches the course from the database using the course_id

            //If the course does not exist, returns an error response indicating the course was not found.
            if(!course){
                return res.status(200).json({
                    success: false,
                    message:  "Could not find the course"
                })
            } 

            const uid = new mongoose.Types.ObjectId(userId); //Converts the userId to a valid MongoDB ObjectId.

            //Checks if the studentsEnrolled array in the course contains the user's ID.
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(200).json({success:false, message:"Student is already Enrolled"});
            }

            //Adds the course price to the totalAmount variable if the user is not already enrolled
            totalAmount += course.price

        } catch(error){
            console.log(error);
            return res.status(500).json({
                success :  false,
                message: error.message
            }) 
            

        }
    }

    const options = {
        amount : totalAmount * 100, //a for INR). Multiplying totalAmount by 100 converts it from rupees to paisa.
        currency : "INR",
        receipt : Math.random(Date.now()).toString(), // A unique identifier for the payment, generated using Math.random() and Date.now(). This helps identify the payment request.
    }

    try{
        const paymentResponse = await instance.orders.create(options) //This line creates a payment order using the Razorpay instance. The instance must be initialized with the Razorpay credentials (key and secret) elsewhere in the code.

        //If the order is successfully created, it sends a response back to the client 
        res.json({
            success: true,
            message : paymentResponse
        })

    } catch(error){
        console.log(error);
        return res.status(500).json({success:false, message:"Could not Initiate Order"});
    }
}


// payment verification and course enrollment processes after a payment is made via Razorpay

exports.verifyPayment = async(req, res) => {
    const razorpay_order_id = req.body?.razorpay_order_id;
    const razorpay_payment_id = req.body?.razorpay_payment_id;
    const razorpay_signature = req.body?.razorpay_signature;
    const courses = req.body?.courses;
    const userId = req.user.id;

    if(!razorpay_order_id ||
        !razorpay_payment_id ||
        !razorpay_signature || !courses || !userId) {
            return res.status(200).json({success:false, message:"Payment Failed"});
    }

    let body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

        if(expectedSignature === razorpay_signature) {
            //enroll karwao student ko
            await enrollStudents(courses, userId, res);
            //return res
            return res.status(200).json({success:true, message:"Payment Verified"});
        }
        return res.status(200).json({success:false, message:"Payment Failed"});

}

const enrollStudents = async (courses, userId, res) => {

    if(!courses || !userId){
        return res.status(400).json({
            success: false,
            message : "Please Provide Data for courses or userId"
        })
    }

    //Iterates over the list of courses
    for(const courseId of courses){
        try{

            //Updates the Course document to add the userId to the studentsEnrolled array.
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id: courseId},
                {$push : {studentsEnrolled : userId}},
                {new : true}
            )
    
            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message : "Course not found"
                })
            }

            const courseProgress = await CourseProgress.create({
                courseId : courseId,
                userId : userId,
                completedVideos: []
            })
    
            //Updates the User document to add the courseId to their list of enrolled courses
            const enrolledStudent = await User.findByIdAndUpdate(userId,
                {$push: {
                    courses : courseId,
                    courseProgress: courseProgress._id
                }}, {new : true}
            )

            if (!enrolledStudent || !enrolledStudent.email) {
                return res.status(400).json({ success: false, message: "User email not found" });
            }
    
            //Sends a confirmation email to the user after successful enrollment 
            // Uses a mailSender utility function to send the email
            const emailResponse = await mailSender(
                enrolledStudent.email,
                `Successfully Enrolled into ${enrolledCourse.courseName}`,
                courseEnrollmentEmail(enrolledCourse.courseName, `${enrolledStudent.firstName} ${enrolledStudent.lastName}`)
            )
    
            console.log("Email sent Successfully", emailResponse.response);

        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message : error.message
            })
        }
        
    }

}


exports.sendPaymentSuccessEmail = async(req, res) =>{
    const {orderId, paymentId, amount} = req.body

    const userId = req.user.id

    if(!orderId || !paymentId || !amount || !userId){
        return res.status(400).json({
            success: false,
            message: "Please provide all the fields"
        })
    }

    try{
        const enrolledStudent = await User.findById(userId)
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(`${enrolledStudent.firstName}`, amount/100, orderId, paymentId)
        )

    } catch(error){
        console.log();
        return res.status(500).json({
            success: false,
            message: "could not send email"
        })
    }
}















































