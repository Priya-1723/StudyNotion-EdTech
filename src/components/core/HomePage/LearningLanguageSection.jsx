import React from 'react'
import HighlightText from '../HomePage/HighlightText';
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plane_your_lessons from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from './CTAButton';

function LearningLanguageSection() {
  return (
    <div className='mb-24'>
      <div className='flex flex-col gap-5 mt-20'>
        <div className=' text-center text-4xl font-semibold mt-10'>
            Your swiss knife for 
            <HighlightText text={" learning any language"}/>
        </div>
        <p className='text-center text-richblack-600 mx-auto text-base w-[75%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
        </p>

        <div className='flex flex-row items-center mt-14'>
            <img src={know_your_progress} alt="know_your_progress" className='object-contain -mr-32'/>
            <img src={compare_with_others} alt="compare_with_others" className='object-contain'/>
            <img src={plane_your_lessons} alt="plane_your_lessons" className='object-contain -ml-32'/>
        </div>

        <div className='mx-auto'>
            <CTAButton active={true} linkto="/signup">Learn More</CTAButton>
        </div>

      </div>
    </div>
  )
}

export default LearningLanguageSection
