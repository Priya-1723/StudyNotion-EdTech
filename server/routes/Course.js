// Import the required modules
const express = require("express");
const router = express.Router()

// Import the controllers
// Course Controllers Import
const {
    createCourse,
    getAllCourses,
    getCourseDetails,
    getFullCourseDetails,
    editCourse,
    getInstructorCourses,
    deleteCourse,
} = require("../controllers/Course");

// Categories controller import
const{
    createCategory,
    showAllCategories,
    categoryPageDetails
} = require("../controllers/Categories")

// Section controllers Import
const {
    createSection,
    updateSection,
    deleteSection
} = require("../controllers/Section")

// SubSection controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubSection
} = require("../controllers/SubSection")

// Rating and review controller import
const {
    createRating,
    getAveragerating,
    getAllRatingReview
} = require("../controllers/RatingAndReview")

const {
    updateCourseProgress
} = require("../controllers/courseProgress")

// Importing middlewares
const { auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth");


// ************* Courses Routes ************************

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/addSection", auth, isInstructor, createSection)
router.post("/updateSection", auth, isInstructor, updateSection)
router.post("/deleteSection", auth, isInstructor, deleteSection)
router.post("/addSubSection", auth, isInstructor, createSubSection)
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
router.post("/deleteSubsection", auth, isInstructor, deleteSubSection)

router.get("/getAllCourses", getAllCourses)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse)
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Delete a Course
router.delete("/deleteCourse", deleteCourse)
// To update course progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

// Category routes (Only by Admin)
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

// Rating and reviews
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAveragerating)
router.get("/getReviews", getAllRatingReview)

module.exports = router