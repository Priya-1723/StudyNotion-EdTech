import React from 'react'
import HighlightText from '../HomePage/HighlightText'

function Quote() {
  return (
    <div className='text-richblack-50 font-semibold text-4xl mt-5 text-center'>
      <sup className='text-richblack-700'>"</sup>We are passionate about revolutionizing the way we learn. Our innovative platform {" "}
      <HighlightText text={" combines technology"} />,
      <span className='bg-custom-gradient2 bg-clip-text text-transparent'>
        {" "}
      expertise
      </span>, and community to create an  {" "}
      <span className='bg-custom-gradient3 bg-clip-text text-transparent'>unparalleled educational experience</span>.<sup className='text-richblack-700 w-[20px]'>"</sup>
    </div>
  )
}

export default Quote
