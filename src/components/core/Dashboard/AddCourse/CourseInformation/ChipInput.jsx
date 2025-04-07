import React, { useEffect, useState } from 'react'
import { MdClose } from 'react-icons/md'
import { useSelector } from 'react-redux'

const ChipInput = ({
  label,
  name,
  placeholder,
  register, //A function from react-hook-form to register the input field
  errors, //Errors object from react-hook-form for validation feedback.
  setValue,
  getValues
}) => {

  const { editCourse, course} = useSelector((state)  => state.course) //editCourse: A boolean that indicates whether the form is in edit mode.
  //course: The current course being edited.

  const [chips, setChips] = useState([]) //chips Maintains the list of entered chips.

  // Form Initialization
  useEffect(() => {
    if(editCourse) {
      setChips(course?.tag) //If editCourse is true, it pre-fills chips with existing tags (course?.tag)
    } 
    register(name, {required : true, validate : (value) => value.length > 0})
  }, [])

  // Update Form State
  useEffect(() => {
    setValue(name, chips)
  }, [chips])

  // Handles chip addition when the user presses Enter or a comma
  const handleKeyDown = (event) => {
    if(event.key === "Enter" || event.key === ","){
      event.preventDefault()
      const chipValue = event.target.value.trim()
      if(chipValue && !chips.includes(chipValue)){
        const newChips = [...chips, chipValue]
        setChips(newChips)
        event.target.value = ""
      }
    }
  }

  // Removes the selected chip from the chips list
  const handleDeleteChip = (chipIndex) => {
    const newChips = chips.filter((_, index) => index !== chipIndex)
    setChips(newChips)
  }


  return (
    <div className='flex flex-col space-y-2' >
      
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}
        <sup className='text-pink-200'>*</sup>
      </label>
      <div className="flex w-full flex-wrap gap-y-2">
        {
          chips.map((chip, index) => (
              <div 
                key={index}
                className="m-1 flex items-center rounded-full bg-yellow-400 px-2 py-1 text-sm text-richblack-5"
              >
                {chip}
                <button
                  type='button'
                  className='ml-2 focus:outline-none'
                  onClick={() => handleDeleteChip(index)}
                >
                  <MdClose className='text-sm' />
                </button>
              </div>
          ))
        }

        <input 
          type="text" 
          id={name}
          name = {name}
          placeholder={placeholder}
          onKeyDown={handleKeyDown}
          className='form-style w-full'
        />
      </div>

      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }
      
    </div>
  )
}

export default ChipInput
