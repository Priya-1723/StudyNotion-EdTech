const CourseProgress = require("../models/CourseProgress")
const SubSection = require("../models/SubSection")
const mongoose = require("mongoose");



exports.updateCourseProgress = async (req, res) => {
  console.log("Incoming request to updateCourseProgress:");
  console.log("Request body:", req.body);
  console.log("User ID:", req.user?.id);

    const { courseId, subsectionId } = req.body
    const userId = req.user.id

    if (!courseId || !subsectionId) {
      console.error("Error: Missing courseId or subsectionId");
      return res.status(400).json({ error: "Missing courseId or subsectionId" });
    }
  
    try {
      // Check if the subsection is valid
      const subsection = await SubSection.findById(subsectionId)
      console.log("Subsection found:", subsection);
      if (!subsection) {
        return res.status(404).json({ error: "Invalid subsection" })
      }
  
      // Find the course progress document for the user and course
      let courseProgress = await CourseProgress.findOne({
        courseId: new mongoose.Types.ObjectId(courseId),
        userId: new mongoose.Types.ObjectId(userId),
      })

      console.log("Course progress found:", courseProgress);
  
      if (!courseProgress) {
        console.log("No CourseProgress found, creating a new one...");
        courseProgress = new CourseProgress({
          courseId: new mongoose.Types.ObjectId(courseId),
          userId: new mongoose.Types.ObjectId(userId),
          completedVideos: [],
        });

        await courseProgress.save();
        console.log("New CourseProgress document created:", courseProgress);
      } 
        // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
          return res.status(400).json({ message: "Subsection already completed" })
      }
  
        // Push the subsection into the completedVideos array
        courseProgress.completedVideos.push(subsectionId)
      
  
      // Save the updated course progress
      await courseProgress.save()
      console.log("CourseProgress Save call done ");
      
  
      return res.status(200).json({ message: "Course progress updated" })

    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }