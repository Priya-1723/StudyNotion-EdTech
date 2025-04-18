const RatingAndReview = require("../models/RatingAndReview")
const Course = require("../models/Course");
const mongoose = require("mongoose")

// create rating
exports.createRating  = async (req, res) => {
    try{
        // get data
        const userId = req.user.id;
        // fetch data from user body
        const {rating, review, courseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {
                _id: courseId,
                studentsEnrolled : {$elemMatch : {$eq : userId}},
            });
        
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: "Student is not enrolled in the course"
            })
        }

        // check if user has already reviewd the course
        const alreadyReviewed = await RatingAndReview.findOne({
            user: userId,
            course: courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message: "Course is already reviewd by the user"
            })
        }

        // create rating review
        const ratingReview = await RatingAndReview.create({
            rating, 
            review,
            course : courseId,
            user: userId,
        });

        // Add the rating and review to the course

        await Course.findByIdAndUpdate(courseId, {
            $push: {
                ratingAndReviews: ratingReview,
            },
        })
        await courseDetails.save()

        // return response
        return res.status(200).json({
            success: true,
            message: "Rating and Review created successfully",
            ratingReview,
        })

    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get average rating
exports.getAveragerating  = async (req, res) => {
    try{

        // get course id
        const courseId = req.body.courseId;

        // calculate average rating
        const result = await RatingAndReview.aggregate([
            {
                $match: {
                    course: new mongoose.Types.ObjectId(courseId), 
                }
            },
            {
                $group: {
                    _id : null,
                    averageRating : {$avg : "$rating"}
                }
            },
        ])

    
        // return rating
        if(result.length > 0){
            return res.status(200).json({
                success: true,
                averageRating : result[0].averageRating,
            })
        }

        // if no rating review exist
        return res.status(200).json({
            success: true,
            message: 'Average rating is 0, no rating given now',
            averageRating: 0
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// get all rating  and reviews

exports.getAllRatingReview = async (req, res) => {
    try{

        console.log("Fetching all reviews...");
        const allReviews = await RatingAndReview.find({})
            .sort({rating: "desc"})
            .populate({path: "user", select: "firstName lastName email image "})
            .populate({path: "course",select: "courseName",})
            .exec();

        console.log("Fetched Reviews:", JSON.stringify(allReviews, null, 2));                                         

        return res.status(200).json({
            success: true,
            message: "All reviews fetched successfully",
            data: allReviews
        })
    }catch(error){

        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

