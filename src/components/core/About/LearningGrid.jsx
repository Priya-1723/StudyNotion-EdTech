import React from 'react'
import HighlightText from '../HomePage/HighlightText'
import CTAButton from "../HomePage/CTAButton"

const LearningGridArray = [
    {
        order: -1,
        heading: "World-Class Learning for",
        highlightText: " Anyone, Anywhere",
        description: "Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
        BtnText: "Learn More",
        BtnLink: "/",
    },
    {
        order: 1,
        heading: "Curriculum Based on Industry Needs",
        description: "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
    },
    {
        order: 2,
        heading: "Our Learning Methods",
        description: "The learning process uses the namely online and offline.",
    },
    {
        order: 3,
        heading: "Certification",
        description: "You will get a certificate that can be used as a certification during job hunting.",
    },
    {
        order: 4,
        heading: `Rating "Auto-grading"`,
        description: "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
    },
    {
        order: 5,
        heading: "Ready to Work",
        description: "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
    },
]

const LearningGrid = () => {
  return (
    <div className='grid mx-auto grid-col-1 lg:grid-cols-4 mb-10'>
      {
        LearningGridArray.map((card, index) => {
            return (
                <div key={index}
                className={`
                    // take 2 col span 
                    ${index === 0 && "lg:col-span-2 lg:h-[250px]"} 
                    // bg color as per odd or even box
                    ${
                        card.order % 2 === 1 ? "bg-richblack-700 lg:h-[250px]" : "bg-richblack-800"
                    }
                    // 2 col start from 2nd col
                    ${
                        card.order === 3 && "lg:col-start-2"
                    } 
                    ${card.order < 0 && "bg-transparent"}`}
                >
                    {
                        card.order < 0 
                        ? (
                            <div className='lg:w-[90%] flex flex-col pb-5 gap-3 '>
                                <h1 className='text-4xl font-semibold text-richblack-25'>
                                    {card.heading}
                                    <HighlightText text={card.highlightText} />
                                </h1>
                                <p className='text-richblack-300 text-base'>{card.description}</p>
                                <button className='w-fit mt-5'>
                                    <CTAButton active={true} to={card.BtnLink}>
                                        {card.BtnText}
                                    </CTAButton>
                                </button>
                            </div>
                        ) 
                        : (
                            <div className='flex flex-col p-6 gap-12 '>
                                <h2 className='text-richblack-5'>{card.heading}</h2>
                                <p className='text-richblack-100 text-base'>{card.description}</p>
                            </div>
                        )
                    }
                </div>
            )
        })
      }
    </div>
  )
}

export default LearningGrid
