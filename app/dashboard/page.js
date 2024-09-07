'use client'

import React, { useContext, useEffect, useState } from 'react'
import Navigation from '../components/Navigation'
import { RxDashboard } from "react-icons/rx";
import { CiGlobe } from "react-icons/ci";
import { RiSettings3Line } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import Dashboard from '../components/Dashboard';
import { useRouter } from 'next/navigation';
import { UserContext } from '../contexts/UserContext';





export default function Page() {
    const [tab, setTab] = useState('dashboard');
    const router = useRouter();
    const { userData, loading, newUserAction, setNewUserAction, chosenTemplate, setChosenTemplate, } = useContext(UserContext);


    const handleLogout = () => {
        // Clear authentication token from localStorage
        localStorage.removeItem('authToken');

        // Optional: Clear other user-related data
        localStorage.removeItem('userData');

        // Redirect the user to the login page or homepage
        router.push('/login');
    };




    return (
        <div className='w-full'>
            {/* <div className='bg-primary'>
                <Navigation />
            </div> */}


            <div className='w-full flex h-screen'>

                <div className='w-[15%] h-screen bg-primary bg-opacity-5'>
                    <div className=' py-6 flex h-screen flex-col justify-between mx-auto'>

                        <div className='w-full h-[80%]'>
                            <div className='flex w-[80%] mx-auto items-center gap-x-3'>
                                <div className=' w-10 h-10 border border-primary rounded-full justify-center items-center flex  bg-primary bg-opacity-5'>
                                    <p className='text-xl font-semibold text-primary'>Q</p>
                                </div>

                                <p className='flex font-semibold text-primary'>{userData?.userName || 'User'}</p>
                            </div>

                            <div className=' my-8 h-full  gap-y-2 flex flex-col'>

                                <div onClick={() => setTab('dashboard')} className={`flex cursor-pointer w-[80%] rounded-lg ${tab === 'dashboard' ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'hover:bg-white hover:bg-opacity-30'} py-3 px-2 mx-auto  gap-x-2 items-center`}>
                                    <RxDashboard className='text-xl font-semibold' />
                                    <span className='font text-'>Dashboard</span>
                                </div>

                                <div onClick={() => setTab('domain')} className={`flex cursor-pointer w-[80%] rounded-lg ${tab === 'domain' ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'hover:bg-white hover:bg-opacity-30'} py-3 px-2 mx-auto  gap-x-2 items-center`}>
                                    <CiGlobe className='text-xl' />
                                    <span className='font text-'>Domains</span>
                                </div>

                                <div onClick={() => setTab('themes')} className={`flex cursor-pointer w-[80%] rounded-lg ${tab === 'themes' ? 'bg-primary bg-opacity-10 text-primary font-semibold' : 'hover:bg-white hover:bg-opacity-30'} py-3 px-2 mx-auto  gap-x-2 items-center`}>
                                    <RiSettings3Line className='text-xl' />
                                    <span className='font text-'>Settings</span>
                                </div>
                            </div>


                            <div onClick={handleLogout} className={`flex cursor-pointer w-[80%] rounded-lg  hover:bg-red-600 hover:bg-opacity-30 py-3 px-2 mx-auto  gap-x-2 items-center`}>
                                <IoMdLogOut className='text-xl font-semibold text-red-600' />
                                <span className='font text-red-600 font-semibold'>Logout</span>
                            </div>
                        </div>
                    </div>
                </div>


                {
                    tab === 'dashboard' && (
                        <div className='w-full'>
                            <Dashboard />
                        </div>
                    )
                }


            </div>
        </div>
    )
}
