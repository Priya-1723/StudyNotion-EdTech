import React from 'react'

const Stats = [
    {count:"5K", label:"Active Students" },
    {count:"10+", label:"Mentors" },
    {count:"200+", label:"Courses" },
    {count:"50+", label:"Awards" },
]
const StatsComponent = () => {
  return (
    <div>
      <div className='max-w-maxContent w-11/12 mx-auto py-20'>
        <div className='flex justify-between items-center'>
            {
                Stats.map((data, index) => (
                    
                        <div key={index} className='flex flex-col gap-3 items-center justify-center'>
                            <h1 className='text-3xl text-richblack-5 font-semibold'>{data.count}</h1>
                            <h2 className='text-base text-richblack-300 font-medium'>{data.label}</h2>
                        </div>
                ))
            }
        </div>
      </div>
    </div>
  )
}

export default StatsComponent
