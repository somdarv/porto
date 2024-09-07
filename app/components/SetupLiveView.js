import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext'




export default function SetupLiveView() {
    const { userData, completeTemplateSetup, updateChosenTemplate, loading, newUserAction, setNewUserAction } = useContext(UserContext);
    const [isTemplateChosen, setIsTemplateChosen] = useState(false);
    // Update isTemplateChosen when userData changes
    useEffect(() => {
        if (userData && userData.chosenTemplate) {
            setIsTemplateChosen(true);
            console.log('chooooosen', userData.chosenTemplate)
        } else {
            setIsTemplateChosen(false);
        }
    }, [userData]);  // Runs when userData is updated




    // If userData is still loading or null
    if (!userData) {
        return <p>Loading user data...</p>;
    }
    return (
        <div className=' my-12 w-[35%] mx-auto'>

            {isTemplateChosen ? (
                <div className='w-full'>
                    <p className='my-2 font-semibold'>
                        {`Template ${userData.chosenTemplate}`}
                    </p>
                    <div className='w-full'>
                        <Image
                            width={200}
                            height={200}
                            src={'/temp.jpg'} // You can map this to different template images based on chosenTemplate value
                            alt={`Template ${userData.chosenTemplate}`}
                            className='w-full'
                        />
                    </div>
                </div>
            ) : (
                <div className='w-full h-56 flex items-center justify-center rounded-xl bg-gray-50'>
                    <p className='text-gray-400 text-sm'>Choose A Template to get started</p>
                </div>)}


        </div>
    )
}
