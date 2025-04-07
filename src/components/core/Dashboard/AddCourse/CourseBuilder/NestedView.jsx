import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { FaPlus } from "react-icons/fa";
import SubSectionModal from './SubSectionModal';
import { deleteSection, deleteSubSection } from '../../../../../services/operations/CourseDetailsAPI';
import { setCourse } from '../../../../../slices/CourseSlice';
import ConfirmationModal from '../../../../common/ConfirmationModal'

// handleChangeEditSectionName: A callback function passed down from the parent component to handle editing a section's name.
const NestedView = ({handleChangeEditSectionName}) => {

    const {course} = useSelector((state) => state.course)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch();

    const [addSubSection, setAddSubSection] = useState(null) //addSubSection: Tracks which section is being added to.
    const [viewSubSection, setViewSubSection] = useState(null) //Tracks which subsection is being viewed.
    const [editSubSection, setEditSubSection] = useState(null) //Tracks which subsection is being edited.

    const [confirmationModal, setConfirmationModal] = useState(null) // Tracks confirmation dialog details.


    const handleDeleteSection = async (sectionId) => {
        // Deletes a section using the deleteSection API
        const result = await deleteSection({
          sectionId,
          courseId: course._id,
          token,
        })
        if (result) {
          dispatch(setCourse(result)) //Updates the Redux state with the result by dispatching setCourse.
        }
        setConfirmationModal(null) //Closes the confirmation modal.
    }

    const handleDeleteSubSection = async (subSectionId, sectionId) => {
        // Deletes a subsection using the deleteSubSection API.
        const result = await deleteSubSection({subSectionId, sectionId, token})

        if(result){
            const updatedCourseContent = course.courseContent.map((section) => (
                section._id === sectionId ? result : section
            ))

            const updatedCourse = {...course, courseContent : updatedCourseContent}
            console.log(updatedCourse);

            dispatch(setCourse(updatedCourse));
        }
        setConfirmationModal(null)
    }

  return (
    <div>

        <div className='rounded-lg bg-richblack-700 p-6 px-8' id="nestedViewContainer">
            {
                course?.courseContent?.map((section) => (
                    // Uses <details> and <summary> to make sections collapsible.
                    <details key={section._id} open>
                        
                        <summary className='flex cursor-pointer items-center justify-between border-b-2 border-b-richblack-600 py-2'>

                            <div  className='flex items-center gap-x-3'>

                                <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                <p className="font-semibold text-richblack-50">{section.sectionName}</p>

                            </div>

                            <div className=' flex items-center gap-x-3'>
                                {/* Uses handleChangeEditSectionName to toggle editing mode for the section name. */}
                                <button
                                    onClick={() => handleChangeEditSectionName(section._id, section.sectionName)}
                                    className='flex items-center'
                                >
                                `   <MdEdit className="text-xl align-middle text-richblack-300"/>
                                </button>

                                <button
                                    onClick={(e) =>{
                                        e.stopPropagation();
                                        setConfirmationModal({
                                        text1: "Delete this Section?",
                                        text2: "All the lectures in this section will be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection(section._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                        })
                                    }}
                                >
                                    <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                </button>
                                <span className="font-medium text-richblack-300">|</span>
                                <BiSolidDownArrow  className={`text-xl text-richblack-300`}/>
                            </div>
                            
                        </summary>

                        {/* SubSection */}
                        <div className="px-6 pb-4">
                            {
                                section?.subSection?.map((data) => (
                                    <div key={data?._id}
                                    onClick={() => setViewSubSection(data)}
                                    className='flex cursor-pointer items-center justify-between gap-x-3 border-b-2 border-b-richblack-600 py-2'
                                    >
                                        <div  className='flex items-center gap-x-3'>
                                            <RxDropdownMenu className="text-2xl text-richblack-50"/>
                                            <p className="font-semibold text-richblack-50">{data.title}</p>
                                        </div>

                                        <div className='flex items-center gap-x-3'>
                                            <button
                                                onClick={() => setEditSubSection({...data, sectionId:section._id})}
                                            >
                                                <MdEdit className="text-xl align-middle text-richblack-300"/>
                                            </button>

                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setConfirmationModal({
                                                        text1: "Delete this SubSection",
                                                        text2: "All the lecture in this SubSection will be deleted",
                                                        btn1Text : "Delete",
                                                        btn2Text : "Cancel",
                                                        btn1Handler : () => handleDeleteSubSection(data._id, section._id),
                                                        btn2Handler: () => setConfirmationModal(null), 
                                                    })
                                                }}
                                            >
                                                <RiDeleteBin6Line className="text-xl text-richblack-300"/>
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }

                            <button
                                onClick={() => setAddSubSection(section._id)}
                                className='mt-3 flex items-center gap-x-1 text-yellow-50'
                            >
                                <FaPlus className="text-lg" />
                                <p>Add Lecture</p>
                            </button>
                        </div>

                    </details>
                ))
            }
        </div>

        {
            addSubSection ? (<SubSectionModal 
                modalData={addSubSection} 
                setModalData={setAddSubSection} 
                add={true}/>) 
            : viewSubSection ? (<SubSectionModal 
                modalData={viewSubSection} 
                setModalData={setViewSubSection} 
                view={true}/>) 
            : editSubSection ? (<SubSectionModal 
                modalData={editSubSection} 
                setModalData={setEditSubSection} 
                edit={true}/>) 
            : (<div></div>)
        }
        {
            confirmationModal ? ( <ConfirmationModal modalData={confirmationModal} />) : (<div></div>)
        }
      
    </div>
  )
}

export default NestedView
