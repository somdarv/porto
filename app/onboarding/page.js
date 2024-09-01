'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import SearchComponent from '../components/SearchComponent';
import ProfessionalComponent from '../components/ProfessionalName';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Image from 'next/image';




export default function Page() {
    const [step, setStep] = useState(1);
    const [portfolioType, setPortfolioType] = useState(null);
    const [professionalName, setProfessionalName] = useState('');
    const router = useRouter();

    const handlePortfolioTypeSelect = (selectedResult) => {
        setPortfolioType(selectedResult);
    };

    const handleSubmit = async (professionalNameValue) => {
        console.log('Professional Name:', professionalNameValue);
        console.log('Portfolio Type:', portfolioType);

        if (!professionalNameValue || !portfolioType) {
            console.error('Missing required fields');
            return;
        }

        try {
            const response = await axios.put('http://localhost:5000/api/users/onboard', {
                portfolioTypeId: portfolioType._id,
                professionalName: professionalNameValue,
            }, {
                headers: {
                    'x-auth-token': localStorage.getItem('authToken')
                }
            });


            if (response.status === 200) {
                console.log('Onboarding completed:', response.data);
                // Redirect to dashboard or next step
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Error during onboarding:', error);
        }
    };

    const handleLogout = () => {
        // Clear authentication token from localStorage
        localStorage.removeItem('authToken');

        // Optional: Clear other user-related data
        localStorage.removeItem('userData');

        // Redirect the user to the login page or homepage
        router.push('/login');
    };




    return (
        <div className="whitebg h-screen flex flex-col justify-between">
            <div className='w-[80%] flex items-center justify-between py-4 mx-auto'>
                <div>
                    <Link href={'/#'}>
                        <button className=" text-primary font-bold flex items-center gap-x-2 text-2xl">
                            <Image
                                src={'/favicon.png'}
                                width={40}
                                height={40}
                                alt='porto-logo'
                            />
                            Porto
                        </button>
                    </Link>
                </div>

                <div className='flex items-center gap-x-2 '>
                    <button onClick={handleLogout} className='px-6 py-3 border-2 border-primary rounded-full text-primary font-semibold text-sm'>
                        Log Out
                    </button>
                </div>
            </div>

            <div className='flex justify-center w-full h-full items-center'>
                {step === 1 && (
                    <div className='w-[50%] h-[40%] py-1 mx-auto flex items-center justify-center bg-white rounded-xl shadow-xl'>
                        <div className='w-[75%] mx-auto'>
                            <p className='text-gray-400'>Step 1/2</p>
                            <h1 className='font-bold text-xl my-2'>What type of Portfolio do you want to create?</h1>
                            <div className=' w-[80%] my-2 '>
                                <SearchComponent
                                    step={step}
                                    setStep={setStep}
                                    onSelect={handlePortfolioTypeSelect}
                                    selectedResult={portfolioType}
                                    setSelectedResult={setPortfolioType} // Pass down the selection handler
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className='w-[50%] h-[40%] py-1 mx-auto flex items-center justify-center bg-white rounded-xl shadow-xl'>
                        <div className='w-[75%] mx-auto'>
                            <p className='text-gray-400'>Step 2/2</p>
                            <h1 className='font-bold text-xl my-2'>{`What's Your Professional Name?`}</h1>
                            <div className=' w-[80%] my-2 '>
                                <ProfessionalComponent
                                    step={step}
                                    setStep={setStep}
                                    professionalName={professionalName}
                                    setProfessionalName={setProfessionalName}
                                    onSubmit={handleSubmit}  // Pass down the submit handler
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
