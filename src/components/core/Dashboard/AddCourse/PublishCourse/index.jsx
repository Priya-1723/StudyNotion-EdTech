import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../../common/IconBtn'
import { resetCourseState, setStep } from '../../../../../slices/CourseSlice'
import { COURSE_STATUS } from '../../../../../utils/constant'
import { editCourseDetails } from '../../../../../services/operations/CourseDetailsAPI'

const PublishCourse = () => {

  const {register, handleSubmit, setValue, getValues} = useForm()
  const navigate = useNavigate()
  const {course} = useSelector((state) => state.course);
  const dispatch = useDispatch();
  const {token} = useSelector((state) => state.auth)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if(course?.status === COURSE_STATUS.PUBLISHED){
      setValue("public", true)
    }
  }, [])
 
  const goBack = () => {
    dispatch(setStep(2));
  }

  const goToCourses = () => {
    dispatch(resetCourseState());
    navigate("/dashboard/my-courses")
  }

  const handleCoursePublish = async () => {
    try{
      const isPublished = course?.status === COURSE_STATUS.PUBLISHED && getValues("public") === true
      const isDraft = course?.status === COURSE_STATUS.DRAFT && getValues("public") === false
      if ( isPublished || isDraft) {
        // form has not been updated
        // no need to make api call
        goToCourses()
        return;
      }

      const formData = new FormData()
      formData.append("courseId", course._id)
      const courseStatus = getValues("public")
        ? COURSE_STATUS.PUBLISHED
        : COURSE_STATUS.DRAFT
      formData.append("status", courseStatus)

      console.log("Token:", token)

      setLoading(true)
      const result = await editCourseDetails(formData, token)

      if (result) {
        goToCourses()
      }

    } catch(error){
      console.error("Error in handleCoursePublish:", error);

    } finally {
      setLoading(false); // Ensure loading is stopped even if there's an error
    }
  }

  const onSubmit = () => {
    handleCoursePublish();

  }

  return (
    <div className="rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="text-2xl font-semibold text-richblack-5">
        Publish Course
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="my-6 mb-8">

          <label htmlFor="public" className="inline-flex items-center text-lg">
            <input 
              type="checkbox"
              id='public' 
              {...register("public")}
              className="border-gray-300 h-4 w-4 rounded bg-richblack-500 text-richblack-400 focus:ring-2 focus:ring-richblack-5"
            />
            
            <span className="ml-2 text-richblack-400">
              Make this Cours as Public
            </span>
          </label>
  
        </div>

        {/* Next Previous button */}
        <div className="ml-auto flex max-w-max items-center gap-x-4">
          <button
            disabled={loading}
            type="button"
            onClick={goBack}
            className="flex cursor-pointer items-center gap-x-2 rounded-md bg-richblack-300 py-[8px] px-[20px] font-semibold text-richblack-900"
          >
            Back
          </button>
          <IconBtn disabled={loading} text="Save Changes"/>
        </div>
      </form>
    </div>
  )
}

export default PublishCourse
