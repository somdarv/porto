import React, { useContext } from 'react'
import Biography from './Biography'
import { UserContext } from '../contexts/UserContext';
import { IoArrowBackCircleOutline } from "react-icons/io5";


export default function GeneralSettings() {
    const { userData, loading, newUserAction, completeTemplateSetup, updateChosenTemplate, setNewUserAction, chosenTemplate, setChosenTemplate, comple } = useContext(UserContext);

    const handleBackClick = () => {
        setNewUserAction('guide')
    }

    return (
        <div className='w-full min-h-screen whitebg'>
            <div className='w-[90%] flex justify-between  items-center mx-auto'>
                <button onClick={handleBackClick} className='flex hover: text-semibold my-6 text-base items-center gap-x-1' >
                    <IoArrowBackCircleOutline className='text-xl' />
                    Guide
                </button >

                <h1 className='font-semibold text-xl'>General Settings</h1>

                <div>

                </div>
            </div>

            <Biography />



        </div>
    )
}
