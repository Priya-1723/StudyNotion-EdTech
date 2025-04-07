import React, { useEffect, useState } from 'react'

const RequirementField = ({name, label, register, errors, setValue, getValues, trigger}) => {
    const [requirement, setRequirement] = useState("");//Holds the value of the input field where users type a new requirement.
    const [requirementList, setRequirementList] = useState([]) //Maintains the list of all requirements added by the user.

    useEffect(() => {
      register(name, {
        required: true,
        validate : () => requirementList.length > 0 //ensure that the list of requirements (requirementList) is not empty.
      })
    }, [register, name, requirementList])

    //This useEffect ensures that whenever the requirementList changes, the updated value of requirementList is passed to react-hook-form by using the setValue function.
    useEffect(() => {
      setValue(name, requirementList)
    }, [requirementList, name, setValue, trigger])


    const handleAddRequirement = () => {
      if(requirement){
        const updatedList = [...requirementList, requirement] //Adds the current requirement value to requirementList if it's not empty.
        setRequirementList(updatedList)
        // setValue(name, updatedList)
        setRequirement("") //Clears the requirement input field after adding.
      }
    }

    //Removes the selected requirement from requirementList based on its index.
    const handleRemoveRequirement = (index) => {
      const updateRequirementList = [...requirementList];
      updateRequirementList.splice(index, 1)
      setRequirementList(updateRequirementList)
    }
    
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={name} className="text-sm text-richblack-5">
        {label}
        <sup className="text-pink-200">*</sup>
      </label>
      <div className="flex flex-col items-start space-y-2">
        <input 
          type="text"
          id={name}
          value={requirement}
          onChange={((e) => setRequirement(e.target.value))} 
          className="form-style w-full"
        />
        <button 
          type='button'
          onClick={handleAddRequirement}
          className='font-semibold text-yellow-50'
        >
          Add
        </button>
      </div>
      {
        requirementList.length > 0 && (
          <ul className="mt-2 list-inside list-disc">
            { 
            //If there are any requirements in requirementList, it renders them as a list.
              requirementList.map((requirement, index) => (
                <li key={index} className='flex items-center text-richblack-5'>
                  <span>{requirement}</span>
                  <button
                    type='button'
                    onClick={()  => handleRemoveRequirement(index)}
                    className='ml-2 text-xs text-pure-greys-300'
                  >
                    clear 
                  </button> 
                </li>
                //Each item in the list has a "clear" button to remove the requirement.
              ))
            }
          </ul>
        )
      }

      { //Displays an error message if the list of requirements is empty and the form is submitted.
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
            {label} is required
          </span>
        )
      }
      
    </div>
  )
}

export default RequirementField
