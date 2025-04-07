const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
    courseName: {
        type:String,
    },
    courseDescription: {
        type:String,
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
    whatYouWillLearn: {
        type:String,
    },
    courseContent: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }
    ],
    ratingAndReviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RatingAndReview"
        }
    ],
    price: {
        type:Number,
    },
    thumbnail: {
        type:String,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        // required : true
    },
    tag: {
        type: [String],
        required :  true
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "user",
        }
    ],
    instructions: {
        type : [String],
    },
    status: {
        type: String,
        enum: ["Draft", "Published"]
    },
    sales: {
        type: Number,
        default : 0
    },
    createdAt: {
		type:Date,
		default:Date.now
	},
})

module.exports = mongoose.model("Course", courseSchema)