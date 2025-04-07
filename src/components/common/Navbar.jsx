import React, { useEffect, useState } from 'react'
import { Link, matchPath } from 'react-router-dom'
import Logo from "../../assets/Logo/Logo-Full-Light.png"
import { NavbarLinks } from '../../data/navbar-links'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { PiShoppingCartBold } from "react-icons/pi";
import ProfileDropDown from '../core/Auth/ProfileDropDown'
import { apiConnector } from '../../services/apiConnector'
import { categories } from '../../services/apis'
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineMenu } from "react-icons/ai"
import { ACCOUNT_TYPE } from "../../utils/constant"


function Navbar() {
    const {token} = useSelector((state) => state.auth)
    const {user} = useSelector((state) => state.profile)
    const {totalItems} = useSelector((state) => state.cart)
    const location = useLocation();

    const [subLinks, setSubLinks] = useState([]) // Stores fetched subcategories for the Catalog menu.
    const [loading, setLoading] = useState(false) // Indicates whether subcategory data is being fetched.

    const fetchSublinks = async() => {
        setLoading(true)
        try{
            // Fetches category data from an API (categories.CATEGORIES_API) using apiConnector.
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Fetched categories:", result.data);

            // Populates the subLinks state with fetched data.
            setSubLinks(result.data.data);
        }
        catch(error) {
            console.log("Could not fetch the category list", error);
        }
        setLoading(false)
    }


    useEffect( () => {
        // Calls fetchSublinks once when the component is mounted
        fetchSublinks();
    },[] )
    
    // navbar-links data path and location path match 
    const matchRoute = (route) => {
        // Matches the current URL with the NavbarLinks paths
        return matchPath({path:route}, location.pathname)
    }

  return (
    <div className={`flex h-14 items-center border-b-[1px] border-b-richblack-700 justify-center  ${
        location.pathname !== "/" ? "bg-richblack-800" : ""
    } transition-all duration-200`}>

      <div className='w-11/12 max-w-maxContent flex items-center justify-between'>
      {/* Logo  */}
        <Link to="/">
            <img src={Logo} width={160} height={42} loading='lazy'/>
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:block">
            <ul className='flex gap-x-6 text-richblack-25'>
                {
                    NavbarLinks.map((link, index) => (
                        <li key={index}>
                            {
                                link.title === 'Catalog' ? (
                                    <>
                                        <div className={` group relative flex items-center gap-1 cursor-pointer ${
                                        matchRoute("/catalog/:catalogName") 
                                        ? "text-yellow-25"
                                        : "text-richblack-25"
                                        }`}>
                                            <p>{link.title}</p>
                                            <IoIosArrowDown />

                                            <div className='invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]'>

                                                <div className='absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5'>
                                                </div>

                                            {/* Dropdown */}
                                                {
                                                    loading ? (
                                                        <p className='text-center'>Loading...</p>
                                                    ) : subLinks.length ? (
                                                        <>
                                                            {
                                                                subLinks 
                                                                ?.map((subLink, i) => (
                                                                    <Link 
                                                                    to={`/catalog/${subLink.name
                                                                    .split(" ")
                                                                    .join("-")
                                                                    .toLowerCase()
                                                                    }`} 
                                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                                                    key={i}
                                                                    >
                                                                        <p>{subLink.name}</p>
                                                                    </Link>
                                                                ))
                                                            }
                                                        </>
                                                    ) : (
                                                        <p className="text-center">No Courses Found</p>
                                                    )
                                                }

                                            </div>
                                        </div>
                                    
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "ring-richblack-25"}`}>
                                            {link.title}
                                            
                                        </p>
                                    </Link> 
                                )
                            }
                        </li>
                    ))
                }
            </ul>
        </nav>

        {/* Login, signup, dashboard, logout */}
        <div className='hidden items-center gap-x-4 md:flex'>

            {
                user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                    <Link to='/dashboard/cart' className='relative'>
                        {/* Cart Icon */}
                        <PiShoppingCartBold className='text-2xl text-richblack-100'/>
                        {
                            totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )
                        }
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/login">
                        <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                            Log In
                        </button>
                    </Link>
                )
            }
            {
                token === null && (
                    <Link to="/signup">
                        <button className="rounded-[8px] border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100">
                            Sign Up
                        </button>
                    </Link>
                )
            }
            {
                token !== null && (
                    <ProfileDropDown />
                )
            }
            
        </div>
        <button className="mr-4 md:hidden">
            <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
        </button>
        
      </div>
    </div>
  )
}

export default Navbar


