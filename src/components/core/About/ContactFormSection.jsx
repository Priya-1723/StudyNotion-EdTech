import React from 'react'
import ContactUsForm from '../../ContactPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className='flex flex-col'>
      <h1 className='text-richblack-5 text-center text-2xl font-semibold'>Get in Touch</h1>
      <p className='text-richblack-300 text-base text-center mt-2'>We’d love to here for you, Please fill out this form.</p>
      <div className='mt-7'>
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactFormSection
