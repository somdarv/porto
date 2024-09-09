'use client'

import React, { useContext, useEffect, useState } from 'react'
import { CiLocationOn } from 'react-icons/ci';
import { FaFacebook } from "react-icons/fa";
import { TiSocialInstagramCircular } from "react-icons/ti";
import { AiFillTwitterCircle } from "react-icons/ai";
import { SiteContext } from '../contexts/SiteContext';
import Image from 'next/image';
import { UserContext } from '../contexts/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import ModalAddItem from '../components/ModalAddItem';
import { useParams, useRouter } from 'next/navigation';






export default function Page() {


    const { siteInfo, fetchSiteInfo, loading, isBioComplete, modal, setModal, handleModalClick } = useContext(SiteContext);
    const [locationData, setLocationData] = useState(null);

    const { userData, completeTemplateSetup, updateChosenTemplate, newUserAction, setNewUserAction } = useContext(UserContext);

    const router = useRouter();




    console.log(siteInfo)

    const [imagePreview, setImagePreview] = useState(null);

    // const { expertiseId } = router.query; // Get expertiseId from URL query params
    // const [expertise, setExpertise] = useState(null);
    const portfolioName = siteInfo?.portfolioName || '';





    const formik = useFormik({
        initialValues: {

            file: null,
        },
        validationSchema: Yup.object({

            file: Yup.mixed()
                .required('Profile photo is required')
                .test(
                    'fileSize',
                    'File is too large',
                    (value) => value && value.size <= 2 * 1024 * 1024 // 2MB file size limit
                )
                .test(
                    'fileType',
                    'Unsupported file format',
                    (value) =>
                        value && ['image/jpeg', 'image/png', 'image/gif'].includes(value.type)
                ),
        }),
        onSubmit: async (values) => {
            const formData = new FormData();
            formData.append('coverPhoto', values.coverPhoto); // Append cover photo to formData

            // Submit form data to update the site info
            await updateSiteInfo(formData);

            // Fetch updated site info to reflect the changes
            await fetchSiteInfo();
        },
    });

    useEffect(() => {
        fetchSiteInfo();
    }, []);


    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        formik.setFieldValue('file', file); // Set file in formik state

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the preview image
        }
    };

    // useEffect(() => {
    //     if (siteInfo?.expertiseItems) {
    //         const foundExpertise = siteInfo.expertiseItems.find(item => item._id === expertiseId);
    //         if (foundExpertise) {
    //             setExpertise(foundExpertise); // Set the expertise found
    //         }
    //     }
    // }, [expertiseId, siteInfo]);

    // Fetch the countries, states, cities JSON file
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch('/countries+states+cities (1).json');
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };
        fetchLocationData();
    }, []);

    // Fetch the countries, states, cities JSON file
    useEffect(() => {
        const fetchLocationData = async () => {
            try {
                const response = await fetch('/countries+states+cities (1).json');
                const data = await response.json();
                setLocationData(data);
            } catch (error) {
                console.error('Error fetching location data:', error);
            }
        };
        fetchLocationData();
    }, []);



    // If no expertise is found, show a loading message
    // if (!expertise) {
    //     return <div>Loading expertise details...</div>;
    // }
    // Handle file change for Formik
    const handleFileChange = (event) => {
        formik.setFieldValue('workFile', event.currentTarget.files[0]);
    };



    // Fetch site information when the component mounts


    // Make sure siteInfo exists before accessing properties like portfolioName





    const getCountryName = (countryId) => {
        if (!locationData) return 'Loading...';

        const country = locationData.find((country) => String(country.id) === String(countryId));
        return country ? country.name : 'Unknown Country';
    };

    const getStateName = (countryId, stateId) => {
        if (!locationData) return 'Loading...';

        const country = locationData.find((country) => String(country.id) === String(countryId));
        if (!country) return 'Unknown State';

        const state = country.states.find((state) => String(state.id) === String(stateId));
        return state ? state.name : 'Unknown State';
    };

    const getCityName = (countryId, stateId, cityId) => {
        if (!locationData) return 'Loading...';

        const country = locationData.find((country) => String(country.id) === String(countryId));
        if (!country) return 'Unknown City';

        const state = country.states.find((state) => String(state.id) === String(stateId));
        if (!state) return 'Unknown City';

        const city = state.cities.find((city) => String(city.id) === String(cityId));
        return city ? city.name : 'Unknown City';
    };

    const handleExpertiseClick = (expertiseId) => {
        // Navigate to the dynamic page with the expertiseId
        router.push(`/template/${expertiseId}`);
    };



    // If loading or no data is available yet, show a loading message
    if (loading || !siteInfo) {
        return <div>Loading biography information...</div>;
    }



    return (
        <div className='w-full relative min-h-screen'>
            {/* cover photo */}
            <div className='w-full flex items-center justify-center h-36 bg-gray-100'>

                <label htmlFor="file-upload" className='cursor-pointer w-full h-full flex items-center justify-center relativ'>
                    {siteInfo.coverPhoto ? (
                        <Image
                            src={`http://localhost:5000/${siteInfo.coverPhoto}`} // Display cover photo if available
                            alt="Cover Photo"
                            className='w-full h-full object-cover'
                            width={200}
                            height={200}
                        />
                    ) : (
                        <span className='text-sm font-semibold text-gray-400'>+ Click to upload cover photo</span>
                    )}
                </label>


                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="file-upload"
                />
            </div>

            {/* Baic Profile */}
            <div className='flex my-8 justify-center items-center w-[70%] mx-auto gap-x-8'>

                <div className='w-[15%] '>
                    <div className='absolut w- flex items-center justify-center w-36 h-36  rounded-full bg-gray-100 border-gray-200 border'>
                        {siteInfo.profilePhoto ? (
                            <Image
                                src={`http://localhost:5000/${siteInfo.profilePhoto}`}
                                alt="Profile Photo"
                                className='rounded-full w-full h-full object-cover'
                                width={200}
                                height={200}
                            />
                        ) : (
                            ''
                        )}
                    </div>
                </div>

                <div className='w-[70%]'>
                    <div className='flex items-start justify-between'>
                        <div>
                            <h1 className='text-xl font-semibold'>{siteInfo.professionalName || 'Professional Name'}</h1>
                            <p className='text-sm'>{portfolioName}</p>
                        </div>

                        <div className=''>
                            <button
                                className='absolute  buttom-0 text-white rounded-full text-xs px-6 py-2  bg-primary'>
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className='flex my-2 gap-x-2 items-center '>
                        <CiLocationOn />
                        <p className='font-light text-sm'>{`${getCityName(siteInfo.country, siteInfo.state, siteInfo.city)}, ${getCountryName(siteInfo.country)}`}</p>
                    </div>

                    <div className='w-[80%]'>
                        <p className='text-sm'>{siteInfo.bio || 'No biography provided yet.'}</p>
                    </div>

                    <div className='flex text-gray-400 my-2 items-center gap-x-2'>
                        <FaFacebook className='text-xl' />
                        <TiSocialInstagramCircular className='text-2xl' />
                        <AiFillTwitterCircle className='text-xl' />
                    </div>
                </div>


            </div>

            {/* Add Category */}
            <div className='w-[70%] border-b-2 gap-x-8 border-gray-200 flex mx-auto justify-betw'>
                <div className='  cursor-pointer  my-2'>
                    <p className='px-6 py-2 flex text-sm items-center justify-center rounded-md text-white w- font-semibold bg-primary'>Work</p>
                </div>

                <div className='rounded-md flex  '>
                    <button onClick={handleModalClick} className='text-sm '>
                        + Add Item
                    </button>
                </div>
            </div>


            {/* works */}

            <div className='w-[70%] flex flex-wrap gap-x-4 items-center justify-between mx-auto my-6'>
                {siteInfo?.expertiseItems && siteInfo.expertiseItems.length > 0 ? (
                    siteInfo.expertiseItems.map((item, index) => (
                        <div onClick={() => { handleExpertiseClick(item._id); console.log('this', item._id) }} key={index} className='w-[20%] cursor-pointer'>
                            <div className='catImage rounded-lg cursor-pointer border h-32 flex items-center justify-center'>
                                <p className='text-white font-semibold'>{item.title}</p>
                            </div>
                            <div>
                                <h1 className='font-semibold text-sm mt-2'>{item.title}</h1>
                                <p className='text-xs mt-2'>{item.description}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No expertise added yet.</p>
                )}

            </div>

            <div className='w-[70%] mx-auto flex justify-end'>
                <button onClick={formik.handleSubmit}
                    className='absolute  buttom-0 text-white rounded-full text-sm px-6 py-3  bg-primary'>
                    Save Changes
                </button>
            </div>
            {/* Expertise Modal */}
            {modal && <ModalAddItem />}

        </div>
    )
}
