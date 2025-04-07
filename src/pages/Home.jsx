import React from 'react'
import {Link} from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText';
import CTAButton from '../components/core/HomePage/CTAButton'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import InstructorSection from '../components/core/HomePage/InstructorSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer'
import ReviewSlider from '../components/common/ReviewSlider';

function Home(){
    return (
        <div>

            {/*  Section 1  */}
            <div className=' relative max-w-maxContent mx-auto flex flex-col w-11/12 items-center text-white justify-between'>

                <Link to={"/signup"}> 

                    <div className=' group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                        <div className='flex flex-row justify-center items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900'>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                
                </Link>

                <div className=' text-center text-3xl  lg:text-4xl font-semibold mt-10'>
                    Empower Your Future with 
                    <HighlightText text={" Coding Skills"} />
                </div>

                <div className='w-[90%] text-center text-lg font-medium text-richblack-300 mt-5'>
                    With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
                </div>

                <div className='flex flex-row gap-7 mt-8'> 
                    <CTAButton active={true} linkto={"/signup"}> Learn More </CTAButton>
                    <CTAButton active={false} linkto={"/login"}> Book a Demo</CTAButton>
                    {/* HW:-  shadow to btns , instructor btn shadow*/}
                </div>

                <div className='relative mx-3 my-14'>
                    {/* Gradient background behind the video */}
                    <div className="absolute inset-0 top-0 left-[224px] w-[992px] h-[295px]  opacity-[0.4] blur-[120px] z-0"
                        style={{
                            background: "linear-gradient(117.82deg, #9CECFB -9.12%, #65C7F7 48.59%, #0052D4 106.3%)",
                        }}
                    ></div>

                    {/* Video */}
                    <video
                    muted
                    loop
                    autoPlay
                    className='sm:shadow-custom shadow-custom-mobile relative z-10 w-full sm:w-full lg:w-full'
                    >
                        <source src={Banner} type="video/mp4"></source>
                    </video>
                </div>

                {/* Code section 1  */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className='text-3xl  lg:text-4xl font-semibold'>
                                Unlock your
                                <HighlightText text={" coding potential "}/>
                                with our online courses
                            </div>
                        }
                        subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."}
                        ctabtn1={
                            {
                                btnText: "Try it yourself",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblocks={ `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>/h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a> \n<a href="three/">Three</a>\n</nav> `}

                        backgroundgradient={"linear-gradient(123.77deg, #8A2BE2 -6.46%, #FFA500 59.04%, #F8F8FF 124.53%)"}

                        codeColor={"text-yellow-25"}
                    />
                </div>

                {/* Code section 2  */}
                <div>
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                                Start
                                <HighlightText text={" coding \n in seconds "}/>
                            </div>
                        }
                        subheading={"Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."}
                        ctabtn1={
                            {
                                btnText: "Continue Lesson",
                                linkto: "/signup",
                                active: true
                            }
                        }
                        ctabtn2={
                            {
                                btnText: "Learn More",
                                linkto: "/login",
                                active: false
                            }
                        }

                        codeblocks={ `<!DOCTYPE html>\n<html>\n<head>\n<title>Example</title>\n<link rel="stylesheet" href="styles.css">\n</head>\n<body>\n<h1><a href="/">Header</a>/h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a> \n<a href="three/">Three</a>\n</nav> `}

                        backgroundgradient={ "linear-gradient(118.19deg, #1FA2FF -3.62%, #12D8FA 50.44%, #A6FFCB 104.51%)"}

                        codeColor={"text-yellow-25"}
                    />
                </div>

                <ExploreMore />
                

            </div>

            {/*  Section 2  */}
            <div className='bg-pure-greys-5 text-richblack-700 '>
                <div className='homepage_bg h-[310px]'>

                    <div className='h-[150px]'></div>
                    <div className='w-11/12  max-w-maxContent flex justify-center items-center gap-5 mx-auto'>
                        <div className="lg:h-[150px]"></div>
                        <div className='flex flex-row  gap-7 text-white lg:mt-8'>
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className='flex flex-row items-center gap-3'>
                                    Explore Full Catalog 
                                <   FaArrowRight />
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={"/login"}>Learn more</CTAButton>
                        </div>
                    </div>
                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between '>
                    <div className='flex flex-row gap-10 mt-[90px] mb-[52px] lg:mt-20 lg:flex-row lg:gap-0'>
                        <div className=' text-4xl font-semibold lg:w-[45%]'>
                            Get the skills you need for a 
                            <HighlightText text={" job that is in demand."} />
                        </div>

                        <div className='flex flex-col lg:w-[40%] gap-10 items-start'>
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                               
                            <CTAButton active={true} linkto={"/signup"}> Learn More</CTAButton>
                        </div>
                    </div>
                    
                    <TimelineSection />

                    <LearningLanguageSection/>
                        
                </div>
            </div>

            {/*  Section 3  */}
            <div className="relative w-11/12 max-w-maxContent my-20 flex flex-col mx-auto items-center justify-between gap-8 bg-richblack-900 text-white">
                <InstructorSection />
                
                <h2 className="text-center text-4xl font-semibold mt-10">Review from other learners</h2>

                {/* Apply w-full to ReviewSlider */}
                <div className="w-full">
                    <ReviewSlider />
                </div>
            </div>

            {/*  Footer  */}
            <div className='bg-richblack-800 pt-12'>
                <Footer />
            </div>
        </div>
    )
}

export default Home