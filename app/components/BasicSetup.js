'use client'

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CgCheck, CgExternal } from "react-icons/cg";
import Sites from './Sites';
import { UserContext } from '../contexts/UserContext';
import ChooseTemplate from './ChooseTemplate';
import GiveSiteName from './Biography';
import SetupLiveView from './SetupLiveView';
import { SiteContext } from '../contexts/SiteContext';
import { useRouter } from 'next/navigation';





export default function BasicSetup() {
    const { userData, isBioComplete, ompleteTemplateSetup, setSiteInfo, updateChosenTemplate, isCompleteTemplateSetup, setIsCompleteTemplateSetup, loading, newUserAction, setNewUserAction, chosenTemplate } = useContext(UserContext);
    const { siteInfo, } = useContext(SiteContext);
    const router = useRouter();


    return (
        <div className='w-full'>
            <div>
                {userData ? (
                    <div className='w-[90%] mx-auto py-12'>
                        <h1 className='font-semibold text-gray-600 text-xl'>Welcome, {userData.userName}</h1>
                        <p className='text-sm my-2'>{`We'll guide you get your first site up and running in no time`}</p>


                        <div className='flex justify-between'>
                            <div className='rounded-lg border w-[50%] mx-aut my-12 px-3 py-2 text-sm border-gray-200'>


                                <div className='w-[90%] py-4 mx-auto'>

                                    <p className='font-semibold text-base'>Site Setup</p>


                                    <div onClick={() => setNewUserAction('template')}
                                        className={`border-b flex my-1 cursor-pointer ${isCompleteTemplateSetup === true ? 'text-primary' : ''} hover:text-primary items-center gap-x-2 py-4 w-[100%] mx-auto`}>

                                        <CgCheck className={`text-lg ${isCompleteTemplateSetup === true ? 'text-primary' : 'text-gray-500'}`} />
                                        <h1 className='text-sm'>Choose A Template</h1>
                                    </div>


                                    <div onClick={() => setNewUserAction('name')} className={`border-b flex my-1 cursor-pointer ${isBioComplete ? 'text-primary' : ''} hover:text-primary items-center gap-x-2 py-4 w-[100%] mx-auto'`}>

                                        <CgCheck className={`text-lg ${isBioComplete ? 'text-primary' : 'text-gray-500'}`} />
                                        <h1 className='text-sm'>Your Biography</h1>
                                    </div>


                                    <div onClick={() => {
                                        // setNewUserAction('setup');
                                        router.push('/template'); // Replace '/new-page' with the path you want to navigate to
                                    }} className='border-b flex my-1 cursor-pointer hover:text-primary items-center gap-x-2 py-4 w-[100%] mx-auto'>

                                        <CgCheck className='text-lg text-gray-500' />
                                        <h1 className='text-sm'>{`Update Your Site's Design`}</h1>
                                    </div>



                                    <div className='border-b flex my-1 cursor-pointer hover:text-primary items-center gap-x-2 py-4 w-[100%] mx-auto'>

                                        <CgCheck className='text-lg text-gray-500' />
                                        <h1 className='text-sm'>Launch Your Site</h1>
                                    </div>

                                </div>


                            </div>

                            <SetupLiveView />
                        </div>




                    </div>


                ) : (
                    <p>Loading user data...</p>
                )}
            </div>
        </div >
    )
}
