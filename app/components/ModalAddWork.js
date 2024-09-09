'use client'

import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SiteContext } from '../contexts/SiteContext';


export default function ModalAddWork({ expertiseId }) {
    const [activeField, setActiveField] = useState(''); // Add this state to track the active field
    const { addwork, addWorkToExpertise, loading, updateSiteInfo, modal, setModal, handleModalClick } = useContext(SiteContext);

    const formik = useFormik({
        initialValues: {
            workTitle: '',
            workDescription: '',
            workFile: null,
            workLink: '',
        },
        validationSchema: Yup.object({
            workTitle: Yup.string().required('Title is required'),
            workDescription: Yup.string().required('Description is required'),
            workFile: Yup.mixed(),
            workLink: Yup.string(),
        }),
        onSubmit: async (values) => {
            const workData = {
                workTitle: values.workTitle,
                workDescription: values.workDescription,
                workLink: values.workLink,
                workFile: values.workFile,
            };

            try {
                // Send form data to update site info using context function
                await addWorkToExpertise(expertiseId, workData);
                console.log(workData)
                console.log('the expertise', expertiseId)             // Make sure expertiseId is accessible here
                // Close the modal after successful submission
                setModal(false);
            } catch (error) {
                console.error('Error adding work:', error);
            }
        },
    });


    const getFieldClasses = (field) => {
        if (activeField === field) {
            return 'border-primary'; // Field is focused
        }
        if (formik.touched[field] && formik.errors[field]) {
            return 'border-red-500'; // Field has been touched and has an error
        }
        return 'border-gray-400'; // Default border
    };
    // Handle file change for Formik
    const handleFileChange = (event) => {
        formik.setFieldValue('workFile', event.currentTarget.files[0]);
    };

    return (
        <div className='w-full h-screen absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center '>
            <div className='w-[30%] mx-auto py-2 bg-white rounded-2xl'>
                <form onSubmit={formik.handleSubmit} className='w-[90%] mx-auto'>
                    <h1 className='text-center my-4 font-semibold'> Add work </h1>

                    <div className='my-'>
                        <p className="font-se text-sm">Title</p>
                        <input
                            type="text"
                            name="workTitle"
                            className={`rounded-md outline-none border text-sm py-2 px-2 w-full ${getFieldClasses('title')}`}
                            placeholder="Enter Title Here"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workTitle}
                        />
                        {formik.errors.workTitle && formik.touched.workTitle && (
                            <div className="text-red-500 text-sm">{formik.errors.workTitle}</div>
                        )}

                    </div>

                    <div className='mt-6'>
                        <p className="font-sd text-sm">Description</p>
                        <textarea
                            name="workDescription"
                            maxLength={800}
                            className={`rounded-md text-sm outline-none border py-2 px-2 w-full h-32 ${getFieldClasses('description')}`}
                            placeholder="Enter Description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workDescription}
                        />
                        {formik.errors.workDescription && formik.touched.workDescription && (
                            <div className="text-red-500 text-sm">{formik.errors.workDescription}</div>
                        )}

                    </div>

                    <div className='mt-6'>
                        <label htmlFor="workFile" className="block text-xs font-medium text-gray-700">
                            Upload Work
                        </label>
                        <input
                            id="workFile"
                            name="workFile"
                            type="file"
                            onChange={handleFileChange}
                            className="mt-1 block w-full border px-3 py-2"
                        />
                        {formik.touched.workFile && formik.errors.workFile ? (
                            <div className="text-red-500 text-sm">{formik.errors.workFile}</div>
                        ) : null}
                    </div>


                    <div className='my-'>
                        <p className="font-se text-sm">Work Link</p>
                        <input
                            type="text"
                            name="workLink"
                            className={`rounded-md outline-none border text-sm py-2 px-2 w-full ${getFieldClasses('title')}`}
                            placeholder="Enter Link to work here"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.workLink}
                        />
                        {formik.errors.workLink && formik.touched.workLink && (
                            <div className="text-red-500 text-sm">{formik.errors.workLink}</div>
                        )}

                    </div>

                    <div className='my- flex gap-x-2 justify-end'>
                        <button onClick={handleModalClick} className={`border border-primary text-primary my-2 flex justify-end text-center text-sm font-semibol px-6 py-2 rounded-full 
                                `}
                        >
                            Cancel
                        </button>



                        <button type="submit" disabled={loading}
                            className={`bg-[#0085D2] hover:bg-opacity-80 text-white text-sm my-2 font-semibold px-6 py-2 rounded-full ${loading ? 'opacity-50' : ''}`}
                        >
                            Submit
                        </button>

                    </div>


                </form>
            </div >

        </div >
    )
}
