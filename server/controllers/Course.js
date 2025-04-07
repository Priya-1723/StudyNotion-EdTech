const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const {uploadImageToCloudinary} = require("../utils/imageUploader")
const { convertSecondsToDuration } = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress")

// Helper function to convert time string to seconds
const convertTimeToSeconds = (time) => {
  if (!time) return 0;
  const parts = time.split(":").map(Number);
  if (parts.length === 2) {
      return parts[0] * 60 + parts[1]; // Convert MM:SS to seconds
  }
  return parseInt(time, 10) || 0;
};

// Function to create a new course
exports.createCourse = async (req, res) =>{
    try{

        // Get user ID from request object
        const userId = req.user.id;
        // Get all required fields from request body
        let {
            courseName, 
            courseDescription, 
            whatYouWillLearn, 
            price, 
            tag:_tag,
            category,
            status,
            instructions :_instructions,
        } = req.body

        //  Get thumbnail image from request files
        const thumbnail = req.files.thumbnailImage;
        const tag = JSON.parse(_tag)
        const instructions = JSON.parse(_instructions)

        //  Check if any of the required fields are missing
        if(
            !courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !tag.length || 
            !thumbnail ||
            !category ||
            !instructions.length
        ){
            res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (!status || status === undefined) {
          status = "Draft";
        }

        // Check if the user is an instructor
        const instructorDetails = await User.findById(userId, {
            accountType: "Instructor",
          })
        console.log("Instructor Details: ", instructorDetails);
        
        if (!instructorDetails) {
          return res.status(404).json({
            success: false,
            message: "Instructor Details Not Found",
          });
        }

        // Check if the category given is valid
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(404).json({
                success: false,
                message: "Category Details not found"
            })
        }

        // Upload the Thumbnail to Cloudinary
        const thumbnailImage = await uploadImageToCloudinary(
            thumbnail, 
            process.env.FOLDER_NAME
        );
        console.log(thumbnailImage);

        // Create a new course with the given details
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn: whatYouWillLearn,
            price,
            tag,
            category: categoryDetails._id,
            thumbnail: thumbnailImage.secure_url,
            status: status,
            instructions,
        })

        // Add the new course to the User Schema of the Instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {
                $push: {
                    courses: newCourse._id
                }
            },
            {new: true}
        )

        // Add the new course to the Categories
		const categoryDetails2 = await Category.findByIdAndUpdate(
			{ _id: category },
			{
				$push: {
					courses: newCourse._id,
				},
			},
			{ new: true }
		);
        console.log("HEREEEEEEEE", categoryDetails2)
        
        res.status(200).json({
            success: true,
            data: newCourse,
            message: "Course Created Successfully",
            
        })

    }catch(error){
        console.error("Error in createCourse:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to create Course",
            error: error.message
        })
    }
}

// Edit Course Details
exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.body
        const updates = req.body
        const course = await Course.findById(courseId)
    
        if (!course) {
          return res.status(404).json({ error: "Course not found" })
        }
    
        // If Thumbnail Image is found, update it
        if (req.files) {
          console.log("thumbnail update")
          const thumbnail = req.files.thumbnailImage
          const thumbnailImage = await uploadImageToCloudinary(
            thumbnail,
            process.env.FOLDER_NAME
          )
          course.thumbnail = thumbnailImage.secure_url
        }
    
        // Update only the fields that are present in the request body
        for (const key in updates) {
          if (updates.hasOwnProperty(key)) {
            if (key === "tag" || key === "instructions") {
                try {
                    course[key] = JSON.parse(updates[key]);
                  } catch (err) {
                    course[key] = updates[key].split(","); // Fallback for comma-separated values
                  }
            } else {
              course[key] = updates[key]
            }
          }
        }
    
        await course.save()
    
        const updatedCourse = await Course.findOne({
          _id: courseId,
        })
          .populate({
            path: "instructor",
            populate: {
              path: "additionalDetails",
            },
          })
          .populate("category")
          .populate("ratingAndReviews")
          .populate({
            path: "courseContent",
            populate: {
              path: "subSection",
            },
          })
          .exec()
  
      res.json({
        success: true,
        message: "Course updated successfully",
        data: updatedCourse,
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      })
    }
}


// get all courses handler function
exports.getAllCourses = async (req, res) => {
    try{

        const allCourses = await Course.find(
            { status : "Published" }, 
            {
                courseName: true,
                price: true,
                thumbnail: true,
                instructor: true,
                ratingAndReviews: true,
                studentsEnrolled: true
            }
        )
        .populate("instructor")
        .exec();

        return res.status(200).json({
            success: true,
            data: allCourses,
        })


    }catch(error){
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "Cannot fetch course data",
            error: error.message
        })
    }
}

//getCourseDetails
exports.getCourseDetails = async (req, res) => {
    try{

        // get id
        const {courseId} = req.body;

        // find course details
        const courseDetails = await Course.findOne({_id: courseId})
          .populate({path: "instructor",populate:{path: "additionalDetails"},})
          .populate("category")
          .populate("ratingAndReviews")
          .populate({ path: "courseContent",populate:{path: "subSection",select : "-videoUrl",}})
          .exec();      
                                                
        if(!courseDetails){
            return res.status(404).json({
                success: false,
                message: `Could not find the course with ${courseId}`
            })
        }

        let totalDurationInSeconds = 0
        courseDetails.courseContent.forEach((content) => {
          content.subSection.forEach((subSection) => {
            totalDurationInSeconds += parseInt(subSection.timeDuration);
          })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds) 

        // return response
        return res.status(200).json({
            success: true,
            data: {
                    courseDetails,
                    totalDuration,
                },
            message: "Course details fetched successfully",
        })

    } catch(error){
        console.error(error)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getFullCourseDetails = async (req, res) => {
    try {
      const { courseId } = req.body
      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseId: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
  
      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
}
exports.getInstructorCourses = async (req, res) => {
    try{
        const instructorId = req.user.id
        // console.log("instructorId", instructorId);
        
        const instructorCourses = await Course.find({
            instructor  : instructorId,
        })
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
            select: "timeDuration",
          },
        })
        .sort({ createdAt : -1})

        // console.log("Instructor Courses:", instructorCourses);

        // Calculate total duration for each course
        const coursesWithDuration = instructorCourses.map((course) => {
          let totalDurationInSeconds = 0;

          // Check if courseContent exists before iterating
          if (course.courseContent) {
              course.courseContent.forEach((content) => {
                  if (content.subSection) {
                      content.subSection.forEach((subSection) => {
                          const timeDurationInSeconds = convertTimeToSeconds(subSection.timeDuration);
                          totalDurationInSeconds += timeDurationInSeconds;
                      });
                  }
              });
          }

          console.log(`Course: ${course.courseName}, Total Duration: ${totalDurationInSeconds} seconds`);

          return {
              ...course.toObject(), // Convert Mongoose document to plain object
              totalDuration: convertSecondsToDuration(totalDurationInSeconds),
          };
        });
        // console.log("Processed Courses With Duration:", coursesWithDuration); 

        res.status(200).json({
            success : true,
            data: {
              instructorCourses,
              coursesWithDuration
            }
        })
    } catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Failed to retrieve instructor courses",
            error: error.message,
        })
    }

}

exports.deleteCourse = async (req, res) => {
    try{
        const {courseId } = req.body
        // Find the course
        const course = await Course.findById(courseId)
        if(!course){
            return res.status(404).json({message : "Course not found"})
        }

        // Unenroll students from the course
        const studentsEnrolled = course.studentsEnrolled
        for(const studentId of studentsEnrolled){
            await User.findByIdAndDelete(studentId, {
                $pull : { course: courseId },
            })
        }

        // Delete sections and sub-sections
        const courseSections = course.courseContent
        for(const sectionId of courseSections ){
          // Delete sub-sections of the section
            const section = await Section.findById(sectionId)
            if (section) {
                const subSections = section.subSection
                for (const subSectionId of subSections) {
                await SubSection.findByIdAndDelete(subSectionId)
                }
            } 
             // Delete the section
            await Section.findByIdAndDelete(sectionId)
        }
       // Delete the course
        await Course.findByIdAndDelete(courseId)

        return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
        })

    } catch(error){
        console.error(error)
        return res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
        })
    }
}