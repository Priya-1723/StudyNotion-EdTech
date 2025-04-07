import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI'
import { useLocation } from 'react-router-dom'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { Link } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa6";

function UpdatePassword() {
    
    const {loading} = useSelector((state) => state.auth)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const dispatch = useDispatch()
    const location = useLocation()
    
    const [formData, setFormData] = useState({
        password : "",
        confirmPassword: "",
    })

    const {password, confirmPassword} =  formData

    function handleOnChange(e){
        setFormData((prevData) => (
            {
                ...prevData,
                [e.target.name] : e.target.value
            }
        ))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;
        }
        const token = location.pathname.split('/').at(-1)
        dispatch(resetPassword(password, confirmPassword, token));
    }
    
  return (
    <div className=' flex justify-center items-center h-screen '>
      {
        loading ? (
            <div>
                Loading...
            </div>
        ) :  (
            <div className='w-[508px] p-8 flex flex-col gap-6'>
                <h1 className='text-richblack-25 font-inter font-bold text-3xl'>Choose New Password</h1>
                <p className='text-richblack-300 font-normal text-lg'>Almost done. Enter your new password and youre all set.</p>
                <form onSubmit={handleOnSubmit}>
                    <label className='relative'>

                        <p className='text-sm text-richblack-25 mb-2'>
                            New Passwords
                            <sup className='text-[#EF476F]'>*</sup>
                        </p>

                        <input type={showPassword ? "text" : "password"} required
                        name='password'
                        value={password}
                        onChange={handleOnChange} 
                        placeholder='Password'
                        className='w-full bg-richblack-600 px-3 py-2 text-lg text-richblack-25 font-medium rounded-md'/>

                        <span 
                        onClick={() => setShowPassword((prev) => !prev)} className="absolute right-3 top-[38px] z-[10] cursor-pointer">
                            {
                                showPassword ? <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/> : <AiOutlineEye fontSize={24} fill="#AFB2BF"/>
                            }
                        </span>
                    </label>

                    <label className='relative'>

                        <p className='text-sm text-richblack-25 mb-2 mt-3'>
                            Confirm New Passwords
                            <sup className='text-[#EF476F]'>*</sup>
                        </p>

                        <input 
                        type={showConfirmPassword ? "text" : "password"} required
                        name='confirmPassword'
                        value={confirmPassword}
                        onChange={handleOnChange} 
                        placeholder='Confirm Password' 
                        className='w-full bg-richblack-600 px-3 py-2 text-lg text-richblack-25 font-medium rounded-md'/>

                        <span onClick={() => setShowConfirmPassword((prev) => !prev)} 
                        className="absolute right-3 top-[80px] z-[10] cursor-pointer">
                            {
                                showConfirmPassword 
                                ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) 
                                : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                            }
                        </span>
                    </label>

                    <button type='submit'
                    className=" w-full mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                        Reset Password
                    </button>

                </form>

                <div>
                    <Link to="/login">
                        <p className='flex  items-center gap-2 text-lg text-richblack-25'>
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

export default UpdatePassword
