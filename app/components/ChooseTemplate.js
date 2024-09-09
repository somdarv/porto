import Image from 'next/image';
import React, { useContext } from 'react'
import { CgBackspace } from 'react-icons/cg'
import { FaBackward } from 'react-icons/fa'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';






export default function ChooseTemplate() {
    const { userData, loading, newUserAction, completeTemplateSetup, updateChosenTemplate, setNewUserAction, chosenTemplate, setChosenTemplate, comple } = useContext(UserContext);


    const handleBackClick = () => {
        setNewUserAction('guide')
    }



    console.log(chosenTemplate)
    return (
        <div className='w-full min-h-screen whitebg'>
            <div className='w-[90%] flex justify-between  items-center mx-auto'>
                <button onClick={handleBackClick} className='flex hover: text-semibold my-6 text-base items-center gap-x-1' >
                    <IoArrowBackCircleOutline className='text-xl' />
                    Guide
                </button >

                <h1 className='font-semibold text-xl'>Choose A Template</h1>

                <div>

                </div>
            </div>

            <div className='w-[90%] my-12 mx-auto'>
                <h1
                    style={{
                        fontFamily: "Behind-The-Nineties, sans-serif",

                    }}
                    className="leading-none text-black text-[50px] text-center"
                >
                    Website templates that set you <br /> up for success
                </h1>

                <p className="text-whit text-base text-center my-8 w-[50%] mx-auto">
                    Setting up your own portfolio website is a fantastic way to express
                    who you are as a creative, and to share your talents with the world.
                </p>
            </div>


            <div className='w-[90%] flex justify-between mx-auto'>
                <div onClick={() => updateChosenTemplate(1)} className='w-[30%] flex flex-col items-center cursor-pointer '>
                    <Image
                        src={'/temp.jpg'}
                        width={200}
                        height={200}
                        className='w-full hover:shadow-lg'
                        alt='temp' />
                    <p className='font-semibold my-4 text-lg'>Template 1</p>
                </div>
                <div onClick={() => updateChosenTemplate(2)} className='w-[30%] flex flex-col items-center cursor-pointer '>
                    <Image
                        src={'/temp.jpg'}
                        width={200}
                        height={200}
                        className='w-full hover:shadow-lg'
                        alt='temp' />
                    <p className='font-semibold my-4 text-lg'>Template 2</p>
                </div>
                <div onClick={() => updateChosenTemplate(3)} className='w-[30%] flex flex-col items-center cursor-pointer '>
                    <Image
                        src={'/temp.jpg'}
                        width={200}
                        height={200}
                        className='w-full hover:shadow-lg'
                        alt='temp' />
                    <p className='font-semibold my-4 textlgl'>Template 3</p>
                </div>

            </div>



        </div>
    )
}
