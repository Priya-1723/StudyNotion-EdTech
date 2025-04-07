import React from 'react'
import HighlightText from  "../components/core/HomePage/HighlightText"
import BannerImage1  from "../assets/Images/aboutus1.webp"
import BannerImage2  from "../assets/Images/aboutus2.webp"
import BannerImage3  from "../assets/Images/aboutus3.webp"
import foundingStory from "../assets/Images/FoundingStory.png"
import Quote from '../components/core/About/Quote'
import StatsComponent from '../components/core/About/StatsComponent'
import LearningGrid from '../components/core/About/LearningGrid'
import ContactFormSection from '../components/core/About/ContactFormSection'
import Footer from "../components/common/Footer"
import ReviewSlider from '../components/common/ReviewSlider'

function AboutPage() {
  return (
    <div>
      <div >

          {/* section 1 */}
        <section className='bg-richblack-800'>
          <div className=' relative max-w-maxContent mx-auto flex flex-col w-11/12 items-center text-white justify-between'>
              <div className=' w-[900px] flex flex-col items-center gap-4 text-center'>
                <header className='text-richblack-25 text-4xl font-semibold pt-32'>Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"}/>
                </header>

                <p className='text-richblack-300'>
                    Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                </p>
              </div>

              <div className='hidden lg:block lg:h-[200px]'></div>

              <div className='lg:absolute gap-4 justify-center lg:gap-0 flex lg:justify-evenly flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%]'>
                  <img src={BannerImage1} alt=""  />
                  <img src={BannerImage2} alt="" />
                  <img src={BannerImage3} alt="" />
              </div>
          </div>
        </section>

        <div className='hidden lg:block lg:h-[200px]'></div>

          {/* Section 2 */}
        <section>
          <div className='max-w-maxContent  w-11/12 mx-auto mb-24'>
              <Quote />
          </div>
        </section>

        <div className='h-[1px] bg-richblack-700 mb-20'></div>

        {/* Section 3 */}
        <section>
          <div className='text-white flex flex-col gap-24 max-w-maxContent  w-11/12 mx-auto'>

              <div className='flex gap-24 items-center'>
                  <div className='w-[50%] flex flex-col gap-5 '>
                      <h1 className='text-4xl bg-custom-gradient4 bg-clip-text text-transparent font-semibold'>Our Founding Story</h1>
                      <p className='text-richblack-300 text-base'>
                      Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
                      </p>
                      <p className='text-richblack-300 text-base'>
                      As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
                      </p>
                  </div>
                  <div>
                      <img src={foundingStory} alt="" />
                  </div>
              </div>

              <div className='flex gap-24 items-center'>
                  <div className='w-[50%] flex flex-col gap-5 '>
                      <h1 className='text-4xl bg-custom-gradient2 bg-clip-text text-transparent font-semibold'>Our Vision</h1>
                      <p className='text-richblack-300 text-base'>
                      With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.
                      </p>
                  </div>
                  <div className='w-[50%] flex flex-col gap-5 '>
                      <h1 className='text-4xl bg-custom-gradient bg-clip-text text-transparent font-semibold'>Our Mission</h1>
                      <p className='text-richblack-300 text-base'>
                      our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.
                      </p>
                  </div>
              </div>
          </div>
        </section>

        {/* Section 4 */}
        <section  className='bg-richblack-800  mt-20 mb-20 '>
          <StatsComponent />
        </section>

        {/* Section 5 */}
        <section className='max-w-maxContent w-11/12 mx-auto mb-20'>
          <LearningGrid />
        </section>

        {/* Section 6 */}
        <section className='w-fit mx-auto mt-20'>
          <ContactFormSection />
        </section>
        <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
          {/* Reviws from Other Learner */}
          <h1 className="text-center text-4xl font-semibold mt-8">
            Reviews from other learners
          </h1>
          <ReviewSlider />
      </div>
        
      </div>
      {/* Footer */}
      <div className='bg-richblack-800 pt-12 mt-20'>
                <Footer />
      </div>

    </div>
  )
}

export default AboutPage
