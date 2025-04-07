import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/operations/CourseDetailsAPI'
import { setCourse } from '../../../../../slices/CourseSlice'
import { ImCross } from "react-icons/im";
import IconBtn from '../../../../common/IconBtn'
import Upload from '../Upload'

const SubSectionModal = ({
    modalData, //Contains the current subsection data (e.g., title, description, video URL, and IDs) for editing or viewing.
    setModalData, //A function to close or reset the modal.
    add= false, //Boolean flag indicating whether the modal is used to add a subsection
    view = false, //Boolean flag for viewing subsection details without editing
    edit = false // Boolean flag for editing an existing subsection
}) => {

    const {
        register, // Registers form inputs
        handleSubmit, // Handles form submission
        setValue, //Sets form field values programmatically.
        formState : {errors}, //errors Contains form validation errors.
        getValues, // Retrieves the current form values.
    } = useForm()

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const {token} = useSelector((state) => state.auth)
    const {course} = useSelector((state) => state.course)

    // Pre-populates form fields when the modal is in view or edit mode by using setValue
    useEffect(() => {
        if(view || edit){
            setValue("lectureTitle", modalData.title)
            setValue("lectureDesc", modalData.description)
            setValue("lectureVideo", modalData.videoUrl)
        }
    }, [])

    const isFormUpdated = () => {
        // Compares current form values with modalData.
        const currentValues = getValues()
        if(currentValues.lectureTitle !== modalData.title || 
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl 
        ){
            return true; //Returns true if any changes are detected.
        } else{
            return false
        }
    }

    // Updates an existing subsection
    async function handleEditSubSection(){
        const currentValues = getValues()
        const formData = new FormData() //Creates a FormData object with only the updated fields.
        formData.append("sectionId", modalData.sectionId);
        formData.append("subSectionId", modalData._id);

        if(currentValues.lectureTitle !== modalData.title){
            formData.append("title", currentValues.lectureTitle)
        }
        if(currentValues.lectureDesc !== modalData.description){
            formData.append("description", currentValues.lectureDesc)
        }
        if(currentValues.lectureVideo !== modalData.videoUrl){
            formData.append("video", currentValues.lectureVideo)
        }

        setLoading(true)

        // Calls the updateSubSection API and updates Redux state with the result.
        const result = await updateSubSection(formData, token);
        if(result){
            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === modalData.sectionId ? result : section
            ))

            const updatedCourse = {...course, courseContent : updatedCourseContent}
            dispatch(setCourse(updatedCourse))
        }

        setModalData(null)
        setLoading(false)

    }

    async function onSubmit(data) {
        // If in view mode, no action is taken.
        if(view){
            return;
        } 

        if(edit){ 
            // Checks if changes were made using isFormUpdated.
            if(!isFormUpdated){
                toast.error("No Changes made to the form")
            } else {
                handleEditSubSection(); //If changes exist, calls handleEditSubSection
            }
            return;
        }
        
        const formData = new FormData()
        formData.append("sectionId", modalData);
        formData.append("title", data.lectureTitle);
        formData.append("description", data.lectureDesc);
        formData.append("video", data.lectureVideo);
        setLoading(true);

        const result = await createSubSection(formData, token)

        if(result){
            const updatedCourseContent = course.courseContent.map((section) =>
                section._id === modalData ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }

            dispatch(setCourse(updatedCourse));
        }
        setModalData(null)
        setLoading(false)
    }

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

        <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-richblack-400 bg-richblack-800">

            <div className="flex items-center justify-between rounded-t-lg bg-richblack-700 p-5">

                <p className="text-xl font-semibold text-richblack-5">
                    {view && "Viewing"} { add & "adding"} {edit && "editing"} Lecture
                </p>
                <button onClick={() => (!loading ? setModalData(null) : {})}>
                    <ImCross className="text-2xl text-richblack-5"/>
                </button>

            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 px-8 py-10">
                <Upload 
                    name = "lectureVideo"
                    label = "Lecture Video"
                    register = {register}
                    setValue = {setValue}
                    errors = {errors}
                    video = {true}
                    viewData = {view ? modalData.videoUrl : null}
                    editData = {edit ? modalData.videoUrl : null}
                />
                <div className="flex flex-col space-y-2">
                    <label htmlFor='lectureTitle' className="text-sm text-richblack-5">
                        Lecture Title
                    </label>
                    <input 
                        id="lectureTitle" 
                        placeholder='Enter Lecture Title'
                        {...register("lectureTitle", {required: true})}
                        className='w-full form-style'
                    />
                    {errors.lectureTitle && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                        Lecture Title is required
                    </span>)}
                </div>
                <div>
                    <label className="text-sm text-richblack-5" htmlFor='lectureDesc'>
                        Lecture Description
                    </label>
                    <textarea 
                        id='lectureDesc'
                        placeholder='Enter Lecture Description'
                        {...register("lectureDesc", {required:true})}
                        className="form-style resize-x-none min-h-[130px] w-full"
                    />
                    {
                        errors.lectureDesc && (<span className="ml-2 text-xs tracking-wide text-pink-200">
                            Lecture Description is required
                        </span>)
                    }
                </div>

                {
                    !view && (
                        <div className="flex justify-end">
                            <IconBtn 
                                text={loading ? "Loading..." : edit ? "Save Changes" : " save"}
                            />
                        </div>
                    )
                }
            </form>
        </div>
      
    </div>
  )
}

export default SubSectionModal
