import React from 'react'

function HighlightText({text}) {
  return (
    <span className='bg-custom-gradient bg-clip-text text-transparent  font-bold bg-gradient-custom '>
        {text}
    </span>
  )
}

export default HighlightText

