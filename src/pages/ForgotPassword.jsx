import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
import { FaArrowLeft } from "react-icons/fa6";

function ForgotPassword() {

    const [emailSent, setEmailSent] = useState(false)
    const [email, setEmail] = useState("")
    const {loading} = useSelector((state) => state.auth)
    const dispatch = useDispatch()

    function handleOnSubmit(e){
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }


  return (
    <div className=' flex justify-center items-center h-screen '>
      {
        loading ? (
            <div>Loading ..</div>
        ) : (
            <div className='w-[508px] p-8 flex flex-col gap-6'>
                <h1 className='font-inter text-3xl font-semibold text-richblack-25'>
                    {
                        !emailSent ? "Reset your password" : "Check your email"
                    }
                </h1>
                <p className='font-inter text-lg text-richblack-300'>
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                    }
                </p>
                <form onSubmit={handleOnSubmit} >
                    {
                        !emailSent && (
                            <label>
                                <p className='text-sm text-richblack-25 mb-2'>Email Adderess<sup className='text-[#EF476F]'>*</sup></p>
                                <input type="email" required name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Your Email Address' 
                                className='w-full bg-richblack-500 px-3 py-2 text-lg text-richblack-25 font-medium rounded-md'/>
                            </label>
                        )
                    }
                    <button className='text-richblack-800 bg-yellow-25 mt-6 w-full py-2 text-lg font-semibold rounded-lg'> 
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>
                </form>
                <div>
                    <Link to="/login">
                        <p  className='flex  items-center gap-2 text-lg text-richblack-25'>
                            <FaArrowLeft />
                            Back to Login
                        </p>
                    </Link>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default ForgotPassword;
