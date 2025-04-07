import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText'
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from 'react-type-animation';

function CodeBlocks({position, heading, subheading, ctabtn1, ctabtn2, codeblocks, backgroundgradient, codeColor}) {
  return (
    <div className={`w-full sm:w-full lg:w-full md:w-full flex flex-col lg:flex-row ${position} my-20 justify-between gap-10 `}>
      
      {/* section 1 */}
      <div className='sm:w-[50%] flex flex-col gap-8  w-full lg:w-[50%] '>
        {heading}
        <div className='text-richblack-300 font-bold '>
            {subheading}
        </div>

        <div className='flex gap-7  mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                <div className='flex gap-2 items-center'>
                    {ctabtn1.btnText}
                    <FaArrowRight />
                </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
            </CTAButton>
        </div>
      </div>

      {/* Section 2 */}
      <div className='relative flex flex-row h-fit text-[10px] w-[100%] py-4 lg:w-[500px] gap-2 border-[1px] backdrop-blur p-4 text-white rounded-lg' 
      style={{
        borderImage: "linear-gradient(121.74deg, rgba(255, 255, 255, 0.22) -7.75%, rgba(255, 255, 255, 0) 37.38%) 1",
        backdropFilter: "blur(52px)",
        background: "linear-gradient(111.93deg, rgba(14, 26, 45, 0.24) -1.4%, rgba(17, 30, 50, 0.38) 104.96%)",
        
      }}>
        <div
        className="absolute inset-0 -z-10"
        style={{
          width: "372.95px",
          height: "257.05px",
          background: backgroundgradient,
          borderRadius: "50%",
          filter: "blur(68px)",
          opacity: 0.2,
        }}
      ></div>
        <div className='flex flex-col w-[24px] h-[262px]  gap-2 opacity-1'>
            <p>1</p>
            <p>2</p>
            <p>3</p>
            <p>4</p>
            <p>5</p>
            <p>6</p>
            <p>7</p>
            <p>8</p>
            <p>9</p>
            <p>10</p>
            <p>11</p>
        </div>

        <div className={` w-[422px] h-[258px] flex flex-col text-sm font-bold font-mono ${codeColor} pr-2 gap-2 `}>
            <TypeAnimation 
            sequence={[codeblocks, 2000, ""]}
            repeat={Infinity}
            style={
                {
                    whiteSpace: "pre-line",
                    display: "block"
                }
            }
            omitDeletionAnimation
            />
        </div>
      </div>
    </div>
  )
}

export default CodeBlocks


