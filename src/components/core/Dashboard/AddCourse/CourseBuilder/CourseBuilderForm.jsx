import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import {toast} from 'react-hot-toast'
import IconBtn from '../../../../common/IconBtn'
import { IoMdAddCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { FaArrowRight } from "react-icons/fa";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/CourseSlice';
import { createSection, updateSection } from '../../../../../services/operations/CourseDetailsAPI';
import NestedView from './NestedView';

const CourseBuilderForm = () => {

  const {register, handleSubmit, setValue, formState: {errors}} = useForm()
  const [editSectionName, setEditSectionName] =  useState(null) //Tracks the ID of the section currently being edited
  const {course} = useSelector((state) => state.course) //course from state.course to get current course details.
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false) //Tracks the loading state during API calls
  const {token} = useSelector((state) => state.auth) //token from state.auth for authenticated API requests.


   // Handles the form submission for creating or updating a section.
  const onSubmit = async (data) => {
    setLoading(true)
    let result;

    // If editSectionName is not null, calls updateSection to update an existing section
    if(editSectionName){
      result = await updateSection(
        {
          sectionName : data.sectionName,
          sectionId : editSectionName,
          courseId : course._id,
        }, token
      )
    } else {
      // Otherwise, calls createSection to create a new section.
      result = await createSection(
        {
          sectionName : data.sectionName,
          courseId : course._id
        }, token
      )
      
    }

    if (result) {
      dispatch(setCourse(result)); // Ensure this updates the Redux state
      setEditSectionName(null)
      setValue("sectionName", "")
      // console.log("Updated Course State in Redux:", result);
    }
    setLoading(false)

  }

  // Resets the editSectionName state and clears the sectionName input field.
  const cancelEdit = () => {
    setEditSectionName(null)
    setValue("sectionName", "")
  }

  function goBack(){
    dispatch(setStep(1)) //Set the current step to the previous one (setStep(1))
    dispatch(setEditCourse(true)) //Enable editing of the course (setEditCourse(true))

  }

  function gotoNext(){
    //Ensures at least one section is added.
    if(course.courseContent.length === 0 ){
      toast.error("Please add atleast one section")
    }
    //Ensures every section has at least one lecture.
    if(course.courseContent.some((section) => section.subSection.length === 0 )){
      toast.error("Please add atleast one lecture in each section")
      return;
    }

    dispatch(setStep(3)); //If validations pass, sets the current step to the next (setStep(3)).

  }

 

  const handleChangeEditSectionName = (sectionId, sectionName) => {
    // If the section is already being edited, it cancels editing.
    if(editSectionName === sectionId){
      cancelEdit()
      return;
    }

    // Otherwise, sets editSectionName to the selected section and pre-fills the input field with the section's name
    setEditSectionName(sectionId)
    setValue("sectionName", sectionName)
  }

  

  return (
    <div className='bg-richblack-800 p-6 border-[1px] space-y-8 rounded-md border-richblack-700 '>
      <p className='text-xl text-richblack-5 '>Course Builder</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='sectionName' className='text-sm text-richblack-5 '>
            Section Name
            <sup className='text-pink-200'>*</sup>
          </label>
          <input 
            id='sectionName'
            disabled={loading}
            name='sectionName'
            placeholder='Add section Name'
            {...register("sectionName", {required : true})}
            className='w-full form-style' />
            {
              errors.sectionName && (
                <span>
                  Section Name is required
                </span>
              )
            }
        </div>

        <div className='mt-8 flex gap-4'>
          <IconBtn 
            type="Submit"
            disabled={loading}
            text= { editSectionName ? "Edit Section Name" : "Create Section"}
            outline={true}
            customClasses={"text-white"}
          >
            <IoMdAddCircleOutline  className='text-richblack-800 text-2xl'/>
          </IconBtn>
          {
            editSectionName && (
              <button 
                type='button'
                onClick={cancelEdit}
                className='text-base text-richblack-300 underline'
              >
                Cancel Edit
              </button>
            )
          }
        </div>
      </form>

      {
        course?.courseContent?.length > 0 ? (
          <NestedView 
          handleChangeEditSectionName={handleChangeEditSectionName} />
        ) : (<p className='text-center text-pink-200'>There is no section available please add one.</p>)
      }

      <div className='flex justify-end gap-x-3 mt-10'>
        <button onClick={goBack} className='rounded-md cursor-pointer flex items-center text-richblack-50'>
          Back
        </button>

        <IconBtn 
          text="Next"
          onClick={gotoNext}
          disabled={loading}
        >
          <FaArrowRight  className='text-richblack-800 text-2xl'/>
        </IconBtn>
      </div>
      
    </div>
  )
}

export default CourseBuilderForm

