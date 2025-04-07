import React from 'react'
import Logo from '../../assets/Logo/Logo-Full-Light.png'
import { FooterLink2 } from '../../data/footer-links';
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
  "Articles",
  "Blog",
  "Chart Sheet",
  "Code challenges",
  "Docs",
  "Projects",
  "Videos",
  "Workspaces",
];

const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

function Footer() {
  return (
    <div className='flex flex-col gap-8 w-11/12 max-w-maxContent mx-auto'>
        <div className=' flex flex-row justify-between'>
        {/* section 1 */}
        <div className='w-[548px] flex flex-row items-start justify-between'>
          {/* Company */}
          <div className='flex flex-col gap-3'>
              <div className='w-[160px] h-[32px]'>
                  <img src={Logo} alt="logo" />
              </div>
              <h2 className='font-inter text-[16px] font-semibold text-richblack-100'>Company</h2>
              <div className='flex flex-col gap-2 text-richblack-200'>
                  {
                    ["About", "Careers", "Affiliates"].map((ele, i) => {
                      return (
                        <div
                          key={i}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={ele.toLowerCase()}>{ele}</Link>
                        </div>
                      )
                    })
                  }
              </div>
              <div className=' flex flex-row gap-3'>
                  <FaFacebook className='text-richblack-400 w-6 h-6'/>
                  <AiFillGoogleCircle className='text-richblack-400 w-6 h-6'/>
                  <FaTwitter className='text-richblack-400 w-6 h-6'/>
                  <FaYoutube className='text-richblack-400 w-6 h-6'/>
              </div>
          </div>
          {/* Resources and Support */}
          <div className='flex flex-col gap-3'>
              <h2 className='font-inter text-[16px] font-semibold text-richblack-100'>Resources</h2>

              <div className="flex flex-col gap-2 mt-2 text-richblack-200">
                {
                  Resources.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>
              
              <h2 className='font-inter text-[16px] font-semibold text-richblack-100 mt-5'>Support</h2>
              <div className='flex flex-col text-richblack-400 text-[14px] gap-2'>
                  <p>Help Center</p>
              </div>
          </div>
          {/* Plans and Community */}
          <div className='flex flex-col gap-3'>
              <h2 className='font-inter text-[16px] font-semibold text-richblack-100'>Plans</h2>

              <div className="flex flex-col gap-2 mt-2 text-richblack-200">
                {
                  Plans.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                      >
                        <Link to={ele.split(" ").join("-").toLowerCase()}>
                          {ele}
                        </Link>
                      </div>
                    );
                  })
                }
              </div>
              
              <h2 className='font-inter text-[16px] font-semibold text-richblack-100 mt-5'>Community</h2>
              <div className="flex flex-col gap-2 mt-2 text-richblack-200">
                  {
                    Community.map((ele, index) => {
                      return (
                        <div
                          key={index}
                          className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                        >
                          <Link to={ele.split(" ").join("-").toLowerCase()}>
                            {ele}
                          </Link>
                        </div>
                      );
                    })
                  }
              </div>
          </div>
        </div>

        {/* line */}
        <div className=' w-[1px] bg-richblack-700'></div>

        {/* section 2 */}
        <div className='flex flex-row justify-between w-[548px]'>
          {
            FooterLink2.map((category, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-col text-richblack-400 text-[14px] gap-3 w-[30%]'>
                  <h2 className='font-inter text-[16px] font-semibold text-richblack-100'>{category.title}</h2>
                  <ul className='flex flex-col gap-3'>
                    {category.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a href={link.link} className='hover:text-richblack-200 transition-all duration-200'>
                          {link.title}
                        </a>
                      </li>

                    ))}
                  </ul>
                </div>
              )
            })
          }
        </div>
      </div>
      {/* horizontal Line  */}
      {/* <div className=' h-[1px] bg-richblack-700 '></div> */}

      {/* Privacy policy */}
      <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
        {/* Section 1 */}
        <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
          <div className="flex flex-row">
            {BottomFooter.map((ele, i) => {
              return (
                <div
                  key={i}
                  className={` ${
                    BottomFooter.length - 1 === i
                      ? ""
                      : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                  } px-3 `}
                >
                  <Link to={ele.split(" ").join("-").toLocaleLowerCase()}>
                    {ele}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center">Made with ❤️ CodeHelp © 2023 Studynotion</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
