import React from 'react'
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo2,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo3,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
    {
        Logo: Logo4,
        Heading: "Leadership",
        Description: "Fully committed to the success company"
    },
]

function TimelineSection() {
  return (
    <div >
        <div className='flex flex-row gap-20'>
            {/* section 1 */}
            <div className='flex flex-col w-[40%] gap-5'>
                {
                    timeline.map( (element, index )=> {
                        return (
                            <div className='flex flex-row gap-6' key={index}>
                                <div className='w-[52px] h-[52px] bg-white flex items-center justify-center rounded-full'>
                                    <img src={element.Logo}/>
                                </div>
                                <div className='flex flex-col '>
                                    <h2 className='font-semibold text-[18px]'>{element.Heading}</h2>
                                    <p className='text-base'>{element.Description}</p>
                                </div>
                            </div>
                        
                        )
                    })
                }
                
            </div>

            {/* section 2 (Image) */}
            <div className='relative  shadow-blue-200'>
                <img src={timelineImage}  alt='Timeline Image' className='object-cover h-fit'/>

                <div className='absolute bg-caribbeangreen-700 flex flex-row text-white gap-4 py-7  uppercase left-[50%] translate-x-[-50%] translate-y-[-50%] overflow-y-hidden' >
                    <div className='flex flex-row gap-5 px-7 items-center border-r border-caribbeangreen-300'>
                        <h2 className='text-3xl font-bold'>10</h2>
                        <p className='text-caribbeangreen-300 text-sm'>Years Experience</p>
                    </div>
                    <div className='flex flex-row gap-5 items-center px-7'>
                        <h2  className='text-3xl font-bold'>250</h2>
                        <p className='text-caribbeangreen-300 text-sm'>Types of Courses</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default TimelineSection
