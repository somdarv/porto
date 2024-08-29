'use client'

import React, { useState } from 'react'
import Navigation from '../components/Navigation'
import Link from 'next/link'
import SearchComponent from '../components/SearchComponent'



export default function Page() {
    const [step, setStep] = useState(1);
    return (
        <div className="whitebg h-screen flex flex-col justify-between">
            {/* <div className='w-full bg-[#0085D2]'>
                <Navigation page={"home"} />
            </div> */}

            <div className='w-[80%] py-4 mx-auto'>
                <div>
                    <Link href={'/#'}>
                        <button className=" text-primary font-bold  text-2xl">PORTO</button>
                    </Link>
                </div>
            </div>

            {/* main content */}

            <div className='flex justify-center w-full h-full items-center'>
                {
                    step === 1 && (<div className='w-[50%] h-[40%] py-1 mx-auto flex items-center justify-center bg-white rounded-xl shadow-xl'>
                        <div className='w-[75%] mx-auto'>
                            <p className='text-gray-400'>Step 1/2</p>

                            <h1 className='font-bold text-xl my-2'>What type of Portfolio do you want to create?</h1>

                            <div className=' w-[80%] my-2 '>
                                <SearchComponent step={step} setStep={setStep} />
                            </div>
                        </div>
                    </div>)
                }


                {
                    step === 2 && (<div className='w-[50%] h-[40%] py-1 mx-auto flex items-center justify-center bg-white rounded-xl shadow-xl'>
                        <div className='w-[75%] mx-auto'>
                            <p className='text-gray-400'>Step 2/2</p>

                            <h1 className='font-bold text-xl my-2'>{`What's Your Professional Name?`}</h1>

                            <div className=' w-[80%] my-2 '>
                                <SearchComponent step={step} setStep={setStep} />
                            </div>
                        </div>
                    </div>)
                }
            </div>







        </div>
    )
}
