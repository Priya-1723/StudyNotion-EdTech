import { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import {fetchCourseCategories, addCourseDetails, editCourseDetails} from '../../../../../services/operations/CourseDetailsAPI'
import {MdNavigateNext} from 'react-icons/md'
import { setCourse, setStep } from '../../../../../slices/CourseSlice'
import {HiOutlineCurrencyRupee} from 'react-icons/hi'
import RequirementField from './RequirementField'
import IconBtn from "../../../../../components/common/IconBtn"
import { COURSE_STATUS} from '../../../../../utils/constant'
import Upload from '../Upload'
import ChipInput from './ChipInput'


const CourseInformationForm = () => {

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState : {errors},
    } = useForm()

    const {token} = useSelector((state) => state.auth)
    
    const dispatch = useDispatch(); //To trigger Redux actions.
    const {course, editCourse} = useSelector((state) => state.course) //Course-related data from the Redux state
    const [loading, setLoading] = useState(false) //Tracks if data is being loaded
    const [courseCategories, setCourseCategories] = useState([]) // Stores fetched course categories

    useEffect(()=> {
        //getCategories-> fetches course categories and updates state
        const getCategories = async() => {
            setLoading(true);
            const categories = await fetchCourseCategories() //Calls fetchCourseCategories to get the categories from the backend
            if(categories.length > 0) {
                setCourseCategories(categories) //dispatches them to the global Redux state via setCourse
            }
            setLoading(false);
        }

        //If the user is editing an existing course, the form should be pre-filled with the current course data
        if(editCourse) {
            setValue("courseTitle", course.courseName)
            setValue("courseShortDesc", course.courseDescription)
            setValue("coursePrice", course.price)
            setValue("courseTags", course.tag)
            setValue("courseBenefits", course.whatYouWillLearn)
            setValue("courseCategory", course.category)
            setValue("courseRequirements", course.instructions)
            setValue("courseImage", course.thumbnail)
        } //Uses setValue to populate the form fields with existing course details like courseName, price, and description

        getCategories()
    },[])

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.courseTitle !== course.courseName  || 
            currentValues.courseShortDesc !== course.courseDescription  ||
            currentValues.coursePrice !== course.price  ||
            currentValues.courseTags.toString() !== course.tag.toString()  ||
            currentValues.courseBenefits !== course.whatYouWillLearn  ||
            currentValues.courseCategory._id !== course.category._id  ||
            currentValues.courseRequirements !== course.instructions  ||
            currentValues.courseImage !== course.thumbnail ||
            currentValues.courseRequirements.toString() !== course.instructions.toString() 
        ){
            return true
        } else {
            return false
        }
    }

    //   handle next button click
    async function onSubmit(data) {
        if(editCourse){
            if(isFormUpdated()){
                const currentValues = getValues()
                const formData = new FormData()

                formData.append("courseId", course._id)
                if(currentValues.courseTitle !== course.courseName){
                    formData.append("courseName", data.courseTitle)
                }

                if(currentValues.courseShortDesc !== course.courseDescription){
                    formData.append("courseDescription", data.courseShortDesc)
                }

                if(currentValues.coursePrice !== course.price){
                    formData.append("price", data.coursePrice)
                }

                if(currentValues.courseTags !== course.tag){
                    formData.append("tag", data.courseTags)
                }

                if(currentValues.courseBenefits !== course.whatYouWillLearn){
                    formData.append("whatYouWillLearn", data.courseBenefits)
                }

                if(currentValues.courseCategory._id !== course.category._id){
                    formData.append("category", data.courseCategory)
                }

                if(currentValues.courseRequirements.toString() !== course.instructions){
                    formData.append("instructions", JSON.stringify(data.courseRequirements))
                }
                if (currentValues.courseImage !== course.thumbnail) {
                    formData.append("thumbnailImage", data.courseImage)
                }

                setLoading(true)
                const result = await editCourseDetails(formData, token)
                setLoading(false)
                if(result){
                    dispatch(setStep(2))
                    dispatch(setCourse(result))
                }
            } else {
                toast.error("No changes made so far")
            }
            return;
        } 

        // create a new course 
        const formData = new FormData()
        formData.append("courseName", data.courseTitle)
        formData.append("courseDescription", data.courseShortDesc)
        formData.append("price", data.coursePrice)
        formData.append("tag", JSON.stringify(data.courseTags))
        formData.append("whatYouWillLearn", data.courseBenefits)
        formData.append("category", data.courseCategory)
        formData.append("instructions", JSON.stringify(data.courseRequirements))
        formData.append("status", COURSE_STATUS.DRAFT)
        formData.append("thumbnailImage", data.courseImage)

        setLoading(true)
        const result = await addCourseDetails(formData, token)
        if(result){
            dispatch(setStep(2))
            dispatch(setCourse(result))
        }
        setLoading(false)
    }

  return (
    <>

        <form 
        onSubmit={handleSubmit(onSubmit)}
        className=' space-y-8 rounded-md border-richblack-700 bg-richblack-800 p-6 border-[1px]'>
            {/* Course Title */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseTitle" className='text-sm text-richblack-5 '>
                    Course Title
                    <sup className='text-pink-200'>*</sup>
                </label>
                <input 
                    type="text" 
                    id='courseTitle'
                    name='courseTitle'
                    placeholder=' Enter Course Title'
                    {...register("courseTitle", {required: true})}
                    className='w-full form-style'
                />
                {
                    errors.courseTitle &&(
                        <span className='text-pink-200 ml-2 text-xs tracking-wide'>Course title is required</span>
                    )
                }
            </div>
            {/* course short description */}
            <div className='flex flex-col space-y-2'>
                <label htmlFor="courseShortDesc" className="text-sm text-richblack-5">
                    Course Short Description
                    <sup className='text-pink-200'>*</sup>
                </label>
                <textarea 
                    name="courseShortDesc" 
                    id="courseShortDesc"
                    placeholder='Enter Description'                    
                    {...register("courseShortDesc", {required: true})}
                    className='form-style resize-x-none min-h-[140px] w-full'
                />
                {
                    errors.courseShortDesc &&(
                    <span className="ml-2 text-xs tracking-wide text-pink-200">
                        Course short description is required
                    </span>
                    )
                }     
            </div>
            {/* course price  */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="coursePrice" className="text-sm text-richblack-5">
                    Course Price
                    <sup className='text-pink-200'>*</sup>
                </label>
                <div className="relative">
                    <input 
                        id='coursePrice'
                        placeholder=' Enter Course Price'
                        {...register("coursePrice", {
                            required: true,
                            valueAsNumber :true,
                            pattern: {
                                value: /^(0|[1-9]\d*)(\.\d+)?$/,
                            }
                        })}
                        className='w-full form-style !pl-12'
                    />
                    <HiOutlineCurrencyRupee  className = "absolute left-3 top-1/2 inline-block -translate-y-1/2 text-2xl text-richblack-400"/>
                </div>
                {
                    errors.coursePrice &&(
                        <span className="ml-2 text-xs tracking-wide text-pink-200">
                            Course price is required
                        </span>
                    )
                }
            </div>
            {/* course category */}
            <div className="flex flex-col space-y-2">
                <label htmlFor="courseCategory" className="text-sm text-richblack-5">
                    Course Category
                    <sup className='text-pink-200'>*</sup>
                </label>
                <select 
                    id="courseCategory"
                    defaultValue=""
                    {...register("courseCategory", {required: true})}
                    className='w-full form-style'
                >
                    <option value="" disabled>Choose a Category</option>

                    {
                        !loading && courseCategories?.map((category, index) => (
                            <option key={index} value={category?._id}>
                                {category?.name}
                            </option>
                        ))
                    }

                </select>
                {
                    errors.courseCategory && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>Course category is required</span>
                    )
                }
            </div>

            {/* create a custom component for handling tags input */}
            <ChipInput 
                label = "Tags"
                name = "courseTags"
                placeholder="Enter tags and press enter"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}
            />

            {/* Course Thumbnail Image */}
            <Upload
                name="courseImage"
                label="Course Thumbnail"
                register={register}
                setValue={setValue}
                errors={errors}
                editData={editCourse ? course?.thumbnail : null}
            />
            
            {/* Benefits for the course */}
            <div className="flex flex-col space-y-2">
                <label htmlFor='courseBenefits' className="text-sm text-richblack-5"> 
                    Benefits of the course
                    <sup className='text-pink-200'>*</sup>
                </label>
                <textarea 
                    name="courseBenefits" 
                    id="courseBenefits"
                    placeholder='Enter Benefits of the course'                    
                    {...register("courseBenefits", {required: true})}
                    className='min-h-[140px] w-full form-style resize-x-none'
                />
                {
                    errors.courseBenefits && (
                        <span className='ml-2 text-xs tracking-wide text-pink-200'>
                            Benefits of the course required
                        </span>
                    )
                }
            </div>
            {/* requirement list add  */}
            <RequirementField 
                name = "courseRequirements"
                label= "Requirements/Instructions"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}
            />

            {/* Next Button */}
            <div  className="flex justify-end gap-x-2">
                {
                    editCourse && (
                        <button
                            onClick={() => dispatch(setStep(2))}
                            disabled={loading}
                            className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900`}
                        >
                            Continue Without Saving
                        </button>
                    )
                }
                <IconBtn 
                    disabled={loading}
                    text= { !editCourse ? "Next" : "Save Changes"}
                >
                    <MdNavigateNext />
                </IconBtn>
            </div>
        </form>
        
    </>
  )
}

export default CourseInformationForm

