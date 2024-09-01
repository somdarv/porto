import React from 'react'
import { CgExternal } from "react-icons/cg";


export default function Dashboard() {
    return (
        <div className=' w-full'>
            <div className='border-b border-gray-200 py-6 '>

                <div className='w-[80%] mx-auto flex items-center justify-between'>
                    <p>Sites</p>

                    <div>
                        <button className='bg-primary hover:bg-opacity-80 text-white rounded-full text-xs px-6 py-3'>
                            + New Site
                        </button>
                    </div>
                </div>

            </div>




            <div className='w-[80%] my-12 mx-auto'>


                <div className='w-full '>
                    <div className='flex items-center py-3 border-b border-gray-200'>
                        <p className='text-xs uppercase font-light w-[40%]'>Site</p>
                        <p className='text-xs uppercase font-light w-[15%]'>Status</p>
                        <p className='text-xs uppercase font-light w-[20%]'>Last Published</p>
                        <p className='text-xs uppercase font-light w-[20%]'>Statistics</p>
                        <p className='text-xs uppercase font-light flex  w-[25%]'>Action</p>
                    </div>
                </div>




                <div className='flex items-center hover:bg-opacity-5 hover:bg-primary cursor-pointer'>

                    <div className=' w-[40%] flex gap-x-4 items-center  px-4  py-6 cursor-pointer '>

                        <div className=' w-10 h-10 border border-primary rounded-md justify-center items-center flex  bg-primary bg-opacity-5'>
                            <p className='text- font-semibold text-primary'>Q</p>
                        </div>

                        <div className=''>
                            <p className='text-sm'>Site Name</p>
                            <p className='text-xs flex font-light items-center cursor-pointer hover:text-primary'>ssiteurl.porto.com <span className='text-sm' ><CgExternal />
                            </span>
                            </p>
                        </div>
                    </div>

                    <div className='w-[15%] flex gap-x-2 items-center   py-6 cursor-pointer'>
                        <div className='bg-green-500 w-2 h-2 rounded-full'></div><p className='text-sm font-light'>Live</p>
                    </div>

                    <div className='w-[20%] flex gap-x-2 items-center   py-6 cursor-pointer'>
                        <p className='text-sm font-light'>19/08/24</p>
                    </div>

                    <div className='w-[20%] flex gap-x-2 items-center   py-6 cursor-pointer'>
                        <p className='text-sm font-light'>1m visits/mo</p>
                    </div>

                    <div className='w-[25%] flex px- gap-x-2 items-center   py-6 cursor-pointer'>
                        <button className='text-xs text-white px-4 py-2 bg-primary rounded-full font-light'>Pause</button>
                    </div>

                </div>


            </div>


        </div>
    )
}
