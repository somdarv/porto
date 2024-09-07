'use client'

import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import { SiteContext, SiteProvider } from '../contexts/SiteContext';




export default function Biography() {
    const { setNewUserAction } = useContext(UserContext);
    const { updateSiteInfo, loading, error, clearError } = useContext(SiteContext); // Use the SiteContext



    const [imagePreview, setImagePreview] = useState(null);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [activeField, setActiveField] = useState(''); // Add this state to track the active field




    // Fetch the JSON data from the public folder
    useEffect(() => {
        const fetchLocationData = async () => {
            const response = await fetch('/countries+states+cities (1).json');
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
            professionalName: '',
            tagline: '',
            bio: '',
            country: '',
            state: '',
            city: '',
            file: null,
        },
        validationSchema: Yup.object({
            professionalName: Yup.string().required('Professional Name is required'),
            tagline: Yup.string().required('Tagline is required'),
            bio: Yup.string().required('Bio is required')
                .required('Bio is required')
                .max(400, 'Biography must be 280 characters or less'), // Add character limit here,
            country: Yup.string().required('Country is required'),
            state: Yup.string().required('Region/State is required'),
            city: Yup.string().required('City is required'),
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
            formData.append('professionalName', values.professionalName);
            formData.append('tagline', values.tagline);
            formData.append('bio', values.bio);
            formData.append('country', values.country);
            formData.append('state', values.state);
            formData.append('city', values.city);
            formData.append('profilePhoto', values.file);

            // Trigger the updateSiteInfo request in the context
            await updateSiteInfo(formData);
            console.log(updateSiteInfo)
            console.log('Update request finished');
        },
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0]; // Get the selected file
        formik.setFieldValue('file', file); // Set file in formik state

        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the preview image
        }
    };

    const getFieldClasses = (field) => {
        if (activeField === field) {
            return 'border-primary'; // Field is focused
        }
        if (formik.touched[field] && formik.errors[field]) {
            return 'border-red-500'; // Field has been touched and has an error
        }
        return 'border-gray-400'; // Default border
    };


    return (
        <div className="w-full min-h-screen whiteg">
            <div className="rounded-lg borde bg-white w-[60%] mx-auto my-12 px-3 py-2 text-sm border-gray-200">
                <form onSubmit={formik.handleSubmit} className="w-[98%] py-4 mx-auto">
                    <h1 className="text-lg my-4">BIOGRAPHY</h1>

                    <div className="w-full">
                        <div className="flex justify-between">
                            <div>
                                <p className="my-2 text-center font-semibold">Profile Photo</p>
                                <div className="w-32 h-32 flex items-center rounded-full justify-center bg-gray-100 mx-auto">
                                    <label htmlFor="file-upload" className="cursor-pointer w-full h-full flex justify-center items-center">
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
                                        className="hidden"
                                        id="file-upload"
                                    />
                                </div>
                                {formik.errors.file && formik.touched.file && (
                                    <div className="text-red-500 text-sm mt-2">{formik.errors.file}</div>
                                )}
                            </div>

                            <div className="w-[80%]">
                                <div className="my-4 w-[70%]">
                                    {/* Professional Name */}
                                    <p className="font-semibold">Professional Name</p>
                                    <input
                                        type="text"
                                        name="professionalName"
                                        className={`rounded-md outline-none border py-2 px-2 w-full ${getFieldClasses('professionalName')}`}
                                        placeholder="Enter Your Professional Name"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.professionalName}
                                    />
                                    {formik.errors.professionalName && formik.touched.professionalName && (
                                        <div className="text-red-500 text-sm">{formik.errors.professionalName}</div>
                                    )}
                                </div>

                                <div className="my-4 w-[70%]">
                                    {/* Tagline */}
                                    <p className="font-semibold">Tagline</p>
                                    <input
                                        type="text"
                                        name="tagline"
                                        className={`rounded-md outline-none border py-2 px-2 w-full ${getFieldClasses('tagline')}`}
                                        placeholder="Enter Your Tagline"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.tagline}
                                    />
                                    {formik.errors.tagline && formik.touched.tagline && (
                                        <div className="text-red-500 text-sm">{formik.errors.tagline}</div>
                                    )}
                                </div>

                                <div className="my-4 w-[70%]">
                                    {/* Bio */}
                                    <p className="font-semibold">Bio</p>
                                    <textarea
                                        name="bio"
                                        maxLength={400}
                                        className={`rounded-md outline-none border py-2 px-2 w-full h-32 ${getFieldClasses('bio')}`}
                                        placeholder="Your Biography Here"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.bio}
                                    />
                                    <div className='text-sm text-right'>
                                        {formik.values.bio.length}/400
                                    </div>
                                    {formik.errors.bio && formik.touched.bio && (
                                        <div className='text-red-500 text-sm mt-2'>{formik.errors.bio}</div>
                                    )}
                                </div>

                                <div className="my-4 flex justify-between w-[70%] items-center">
                                    {/* Country */}
                                    <div className="w-[30%]">
                                        <p className="font-semibold">Country</p>
                                        <select
                                            name="country"
                                            value={selectedCountry}
                                            onChange={(e) => {
                                                handleCountryChange(e);
                                                formik.setFieldValue('country', e.target.value);
                                            }}
                                            onBlur={formik.handleBlur}
                                            className={`rounded-md outline-none border py-2 px-2 w-full ${getFieldClasses('country')}`}
                                        >
                                            <option value="">Select Country</option>
                                            {countries.map((country) => (
                                                <option key={country.id} value={country.id}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.errors.country && formik.touched.country && (
                                            <div className="text-red-500 text-sm">{formik.errors.country}</div>
                                        )}
                                    </div>

                                    {/* State */}
                                    <div className="w-[30%]">
                                        <p className="font-semibold">Region/State</p>
                                        <select
                                            name="state"
                                            value={selectedState}
                                            onChange={(e) => {
                                                handleStateChange(e);
                                                formik.setFieldValue('state', e.target.value);
                                            }}
                                            onBlur={formik.handleBlur}
                                            className={`rounded-md outline-none border py-2 px-2 w-full ${getFieldClasses('state')}`}
                                        >
                                            <option value="">Select State</option>
                                            {states.map((state) => (
                                                <option key={state.id} value={state.id}>
                                                    {state.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.errors.state && formik.touched.state && (
                                            <div className="text-red-500 text-sm">{formik.errors.state}</div>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div className="w-[30%]">
                                        <p className="font-semibold">City</p>
                                        <select
                                            name="city"
                                            value={selectedCity}
                                            onChange={(e) => {
                                                setSelectedCity(e.target.value);
                                                formik.setFieldValue('city', e.target.value);
                                            }}
                                            onBlur={formik.handleBlur}
                                            className={`rounded-md outline-none border py-2 px-2 w-full ${getFieldClasses('city')}`}
                                        >
                                            <option value="">Select City</option>
                                            {cities.map((city) => (
                                                <option key={city.id} value={city.id}>
                                                    {city.name}
                                                </option>
                                            ))}
                                        </select>
                                        {formik.errors.city && formik.touched.city && (
                                            <div className="text-red-500 text-sm">{formik.errors.city}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-[77%] flex justify-end'>
                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid || loading}
                            className={`bg-[#0085D2] hover:bg-opacity-80 text-white my-4 flex justify-end text-center text-sm font-semibold px-12 py-3 rounded-full border-2
                                ${!formik.isValid || loading ? 'bg-opacity-30 cursor-not-allowed' : ''}`}
                        >
                            {loading ? <FaSpinner className="animate-spin" /> : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
