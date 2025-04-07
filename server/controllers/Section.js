const Section = require("../models/Section")
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

// CREATE a new section
exports.createSection = async(req, res) => {
    try{

        // Extract the required properties from the request body
        const {sectionName, courseId } = req.body; 

        // Data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                success: false,
                message: "Missing required Properties"
            })
        }

        // Create a new section with the given name
        const newSection = await Section.create({sectionName});

       // Add the new section to the course's content array
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent: newSection._id,
                }
            },
            {new: true},
        ).populate({
            path: "courseContent",
            populate:{
                path: "subSection"
            }
        }) 
        .exec();

        // return response
        return res.status(200).json({
            success: true,
            message: "Section created Successfully",
            updatedCourseDetails,
        })


    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Unable to create section, please try again",
            error: error.message
        })
    }
}

exports.updateSection = async(req, res) => {
    try{
        const {sectionName, sectionId, courseId} = req.body;

        // update data 
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new: true}
        )

        const course = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {
                path : "subSection"
            }
        })

        .exec();

        // return response
        return res.status(200).json({
            success: true,
            data : course,
            message: section
        })

    } catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}

// Delete section
exports.deleteSection = async (req, res) => {
    try{

        const { sectionId, courseId } = req.body
        await Course.findByIdAndUpdate(courseId, {
            $pull : {
                courseContent : sectionId,
            }
        })

        const section = await Section.findById(sectionId);
        console.log(sectionId, courseId);
        
        if(!sectionId){
            return res.status(404).json({
                success: false,
                message : "Setion not found"
            })
        }

        // Delete subsection
        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionId)

        // find the updated course and return 
        const course = await Course.findById(courseId).populate({
			path:"courseContent",
			populate: {
				path: "subSection"
			}
		})
		.exec();

        res.status(200).json({
            success: true,
            message : "Section Deleted",
            data: course
        })

    } catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}