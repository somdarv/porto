'use client'

import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { CgBackspace } from 'react-icons/cg'
import { FaBackward } from 'react-icons/fa'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { UserContext } from '../contexts/UserContext';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup'
useEffect





export default function Biography() {
    const { userData, loading, newUserAction, completeTemplateSetup, updateChosenTemplate, setNewUserAction, chosenTemplate, setChosenTemplate, comple } = useContext(UserContext);
    const [imagePreview, setImagePreview] = useState(null);

    const handleBackClick = () => {
        setNewUserAction('guide')
    }
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');


    // Fetch the JSON data from the public folder
    useEffect(() => {
        const fetchLocationData = async () => {
            const response = await fetch('/countries-states-cities.json');
            const data = await response.json();
            setCountries(data); // Assuming this JSON has all the country data
        };

        fetchLocationData();
    }, []);

    // Handle country selection and populate states
    const handleCountryChange = (e) => {
        const countryId = e.target.value;
        setSelectedCountry(countryId);

        // Find selected country and get its states
        const selectedCountryData = countries.find(
            (country) => country.id === parseInt(countryId)
        );

        if (selectedCountryData) {
            setStates(selectedCountryData.states);
            setCities([]); // Reset cities
            setSelectedState(''); // Reset selected state
            setSelectedCity(''); // Reset selected city
        }
    };

    // Handle state selection and populate cities
    const handleStateChange = (e) => {
        const stateId = e.target.value;
        setSelectedState(stateId);

        // Find selected state and get its cities
        const selectedStateData = states.find(
            (state) => state.id === parseInt(stateId)
        );

        if (selectedStateData) {
            setCities(selectedStateData.cities);
            setSelectedCity(''); // Reset selected city
        }
    };


    const formik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema: Yup.object({
            file: Yup.mixed()
                .required("An image is required")
                .test(
                    "fileSize",
                    "File is too large",
                    (value) => value && value.size <= 2 * 1024 * 1024 // 2MB file size limit
                )
                .test(
                    "fileType",
                    "Unsupported file format",
                    (value) =>
                        value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
                ),
        }),
        onSubmit: (values) => {
            console.log('Form submitted', values);
        },
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        formik.setFieldValue("file", file); // Set file in formik state

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the preview image
        }
    };




    return (
        <div className='w-full min-h-screen whiteg'>

            <div className='rounded-lg borde bg-white w-[60%] mx-auto my-12 px-3 py-2 text-sm border-gray-200'>
                <form onSubmit={formik.handleSubmit} className="w-[98%] py-4 mx-auto">
                    <h1 className='text-lg my-4'>BIOGRAPHY</h1>


                    <div className='w-full '>

                        <div className='flex justify-between'>
                            <div>
                                <p className='my-2 text-center font-semibold'>Profile Photo</p>
                                {/* image box */}
                                <div className=''>
                                    <div className='w-32 h-32 flex items-center rounded-full justify-center bg-gray-100 mx-aut'>
                                        <label htmlFor="file-upload" className='cursor-pointer w-full h-full flex justify-center items-center'>
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Uploaded Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-gray-400 text-xs text-center">Click to upload</span>
                                            )}
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden text-center text-sms"
                                            id="file-upload"
                                        />

                                    </div>



                                    {/* Error message for file validation */}
                                    {formik.errors.file && formik.touched.file && (
                                        <div className="text-red-500 text-sm mt-2">{formik.errors.file}</div>
                                    )}
                                </div>
                            </div>

                            <div className='w-[80%] mt-4 bg-red-00'>
                                <div className=''>
                                    {/*Name  */}
                                    <p className='my-2 font-semibold'>Professional Name</p>

                                    <div className={`rounded-md flex items-center border-gray-400  border py-2 px-2 w-[80%]`}>
                                        <input
                                            id='professionalName'
                                            name='professionalName'
                                            type="text"
                                            placeholder='Enter Your Professional Name'
                                            className='w-full outline-none'
                                        />
                                    </div>
                                </div>

                                <div className='my-4'>
                                    {/*Tagline*/}
                                    <p className='my-2 font-semibold'>Tagline</p>

                                    <div className={`rounded-md flex items-center border-gray-400  border py-2 px-2 w-[80%]`}>
                                        <input
                                            id='tagline'
                                            name='tagline'
                                            type="text"
                                            placeholder='Enter Your Tagline'
                                            className='w-full outline-none'
                                        />
                                    </div>
                                </div>

                                <div className='my-4'>
                                    {/*Tagline*/}
                                    <p className='my-2 font-semibold'>Bio</p>

                                    <div className={`rounded-md flex items-center border-gray-400  border py-2 px-2 w-[80%]`}>
                                        <textarea placeholder='Your Biography Here' className='w-full h-32 outline-none focus:none' name="" id=""></textarea>


                                    </div>
                                </div>

                                <div className='my-4 flex justify-between w-[80%] items-center'>
                                    <div className='w-[30%]'>
                                        {/*Country*/}
                                        <p className='my-2 font-semibold'>Country</p>

                                        <div className={`rounded-md flex items-center border-gray-400  border py-2 px-2 `}>
                                            <select className='w-full outline-none' value={selectedCountry} onChange={handleCountryChange}>
                                                <option value="">Select Country</option>
                                                {countries.map((country) => (
                                                    <option key={country.id} value={country.id}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='w-[30%]'>
                                        {/*Country*/}
                                        <p className='my-2 font-semibold'>Region/State</p>

                                        <div className={`rounded-md flex items-center border-gray-400  border py-2 px-2 `}>
                                            <select className='w-full outline-none' value={selectedState} onChange={handleStateChange}
                                            >
                                                <option value="">Select State</option>
                                                {states.map((state) => (
                                                    <option key={state.id} value={state.id}>
                                                        {state.name}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                    </div>
                                    <div className='w-[30%]'>
                                        {/*Country*/}
                                        <p className='my-2 font-semibold'>City</p>

                                        <div className={`rounded-md flex items-center border-gray-400  border py-2 px-2 `}>
                                            <select
                                                value={selectedCity}
                                                onChange={(e) => setSelectedCity(e.target.value)}
                                                className=' w-full'
                                            >
                                                <option value="">Select City</option>
                                                {cities.map((city) => (
                                                    <option key={city.id} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>






                    <button
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid}
                        className={`bg-[#0085D2] hover:bg-opacity-80 text-white my-4 flex text-center text-sm font-semibold  px-12 py-3 rounded-full border-2
                    ${!formik.isValid ? 'bg-[#0085D2] bg-opacity-30 text-white cursor-not-allowed' : ''}
                    ${formik.isSubmitting ? 'bg-[#0085D2] submitBgColor text-white' : ''}`}
                    >
                        {formik.isSubmitting ? <FaSpinner className="animate-spin" /> : 'Login'}
                    </button>
                </form>
            </div>


        </div>
    )
}
