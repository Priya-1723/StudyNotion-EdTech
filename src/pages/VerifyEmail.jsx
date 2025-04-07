import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import OTPInput from 'react-otp-input'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";
import { FaClockRotateLeft } from "react-icons/fa6";
import { sendOtp } from '../services/operations/authAPI';
import { signup } from '../services/operations/authAPI';

function VerifyEmail() {
    const [otp, setOtp ] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {signupData, loading} = useSelector((state) => state.auth)

    useEffect( () => {
        if(!signupData){
            navigate("/signup")
        }
    })

    const handlerOnSubmit = (e) => {
        e.preventDefault()
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
        } = signupData

        dispatch(signup(accountType, firstName, lastName, email, password, confirmPassword, otp, navigate))
    }

  return (
    <div className='flex  justify-center items-center h-screen '>
      {
        loading ? (
            <div>
                Loading...
            </div>
        ) : (
            <div className='w-[508px] p-8 flex flex-col gap-6'>
                <h1 className='text-richblack-25 font-inter font-bold text-3xl'>Verify Email</h1>
                <p className='text-richblack-300 font-normal text-lg'>A verification code has been sent to you. Enter the code below</p>
                <form onSubmit={handlerOnSubmit} > 
                    <OTPInput 
                    value={otp}
                    onChange={setOtp}
                    numInputs = {6}
                    renderInput={(props) => (<input {...props} className="  rounded-md text-richblack-25 bg-richblack-600  text-xl " style={{width:"50px", height:"50px", textAlign:"center"}}/>)}
                    renderSeparator={<span>-</span>}
                    />

                    <button type='submit' className='text-richblack-800 bg-yellow-25 mt-6 w-full py-2 text-lg font-semibold rounded-lg'>
                        Verify Email
                    </button>
                </form>
                <div className='flex items-center justify-between'>
                    <div>
                        <Link to="/login">
                                <p  className='flex  items-center gap-2 text-lg text-richblack-25'>
                                    <FaArrowLeft />
                                    Back to Login
                                </p>
                        </Link>
                    </div>
                    <button className='flex items-center gap-2 text-blue-300 text-lg' 
                    onClick={() => dispatch(sendOtp(signupData.email, navigate))}>

                        <FaClockRotateLeft />
                        Resend it
                    </button>
                </div>
            </div>
        )
      }
    </div>
  )
}

export default VerifyEmail
