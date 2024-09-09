'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { SiteContext } from '@/app/contexts/SiteContext';
import { useParams, useRouter } from 'next/navigation';
import ModalAddWork from '@/app/components/ModalAddWork';
import { FaDownload } from 'react-icons/fa';
import { CgLink } from 'react-icons/cg';


export default function Page() {
    const router = useRouter();
    const { expertiseId } = useParams();  // Get the dynamic route param from useParams
    const { siteInfo, fetchSiteInfo, modal, setModal } = useContext(SiteContext); // Get siteInfo from context
    const [expertise, setExpertise] = useState(null);

    useEffect(() => {
        // Ensure siteInfo is fetched as soon as the component mounts
        fetchSiteInfo();
    }, []); // Empty dependency array ensures this runs only on mount

    // Fetch the expertise item based on expertiseId from siteInfo
    // Fetch the expertise item based on expertiseId from siteInfo
    useEffect(() => {

        console.log("expertiseId:", expertiseId); // Debug expertiseId
        console.log("siteInfo:", siteInfo?.expertiseItems); // Debug siteInfo

        if (siteInfo?.expertiseItems) {
            console.log('items:', siteInfo.expertiseItems)
            // Find the expertise by its ID (or we can change this to match by name/title)
            const foundExpertise = siteInfo.expertiseItems.find(item => item._id === expertiseId);
            console.log('Found expertise:', foundExpertise); // Log the found expertise
            if (foundExpertise) {
                setExpertise(foundExpertise); // Set the expertise in state
            }
        }
    }, [expertiseId, siteInfo]);

    if (!expertise) {
        return <div>Loading expertise details...</div>;
    }


    // Handle file change for Formik
    const handleFileChange = (event) => {
        formik.setFieldValue('workFile', event.currentTarget.files[0]);
    };

    const handleModalClick = () => {
        setModal(!modal);
    }

    // Render the form and expertise details
    return (
        <div className="w-[60%] mx-auto">

            <div className='h-36 my-4 rounded-lg catImage flex items-center'>
                <p className='text-white font-semibold w-[80%] mx-auto text-4xl'>{expertise.title} </p>
            </div>

            <div className='wifull flex justify-end'>
                <button onClick={handleModalClick} className='bg-primary rounded-full text-white text-sm px-3 py-2'>
                    + Add work
                </button>
            </div>


            <div className='border-y-2 py-8 my-4'>
                {expertise.workItems && expertise.workItems.length > 0 ? (
                    expertise.workItems.map((work, index) => (
                        <div key={index} className='mb-8'>
                            <h1 className='font-semibold'>{index + 1}. {work.workTitle}</h1>
                            <p className='text-sm my-4 w-[90%]'>{work.workDescription}</p>

                            <span className='text-sm my-4 w-[90%] text-gray-400'>Work Reference:</span>
                            <div className='flex my-2 items-center gap-x-4'>
                                {work.workFile && (
                                    <a href={`http://localhost:5000/${work.workFile}`} download className='rounded-full flex items-center gap-x-3 text-xs px-4 py-3 bg-gray-200 text-gray-600'>
                                        <FaDownload /> Download Document
                                    </a>
                                )}
                                {work.workLink && (
                                    <a href={work.workLink} target='_blank' rel='noopener noreferrer' className='rounded-full flex items-center gap-x-3 text-sm px-4 py-3 bg-gray-200 text-gray-600'>
                                        <CgLink className='text-lg' /> Link to work
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No work added yet for this expertise.</p>
                )}
            </div>



            {modal && <ModalAddWork expertiseId={expertiseId} />}
        </div>
    );
}
