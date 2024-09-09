'use client'

import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../contexts/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { SiteContext } from '../contexts/SiteContext';









export default function ModalAddItem() {
    const [activeField, setActiveField] = useState(''); // Add this state to track the active field
    const { addExpertise, loading, setModal, handleModalClick } = useContext(SiteContext);


    const formik = useFormik({
        initialValues: {
            expertiseTitle: '',
            expertiseDescription: '',
        },
        validationSchema: Yup.object({
            expertiseTitle: Yup.string().required('Title is required'),
            expertiseDescription: Yup.string().required('Description is required'),
        }),
        onSubmit: async (values) => {
            const expertiseItem = {
                title: values.expertiseTitle,
                description: values.expertiseDescription,
            };

            // Send expertise data to the backend via SiteContext
            await addExpertise(expertiseItem);

            // Close the modal after submission
            setModal(false);
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



    return (
        <div className='w-full h-screen absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center '>
            <div className='w-[30%] mx-auto py-2 bg-white rounded-2xl'>
                <form onSubmit={formik.handleSubmit} className='w-[90%] mx-auto'>

                    <h1 className='text-center my-4 font-semibold'> Add An Expertise </h1>

                    <div className='my-'>
                        <p className="font-se text-sm">Title</p>
                        <input
                            type="text"
                            name="expertiseTitle"
                            className={`rounded-md outline-none border text-sm py-2 px-2 w-full ${getFieldClasses('title')}`}
                            placeholder="Enter Title Here"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.expertiseTitle}
                        />
                        {formik.errors.expertiseTitle && formik.touched.expertiseTitle && (
                            <div className="text-red-500 text-sm">{formik.errors.expertiseTitle}</div>
                        )}

                    </div>


                    <div className='mt-6'>
                        <p className="font-sd text-sm">Description</p>
                        <textarea
                            name="expertiseDescription"
                            maxLength={400}
                            className={`rounded-md text-sm outline-none border py-2 px-2 w-full h-32 ${getFieldClasses('description')}`}
                            placeholder="Enter Description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.expertiseDescription}
                        />
                        {formik.errors.expertiseDescription && formik.touched.expertiseDescription && (
                            <div className="text-red-500 text-sm">{formik.errors.expertiseDescription}</div>
                        )}

                    </div>

                    <div className='my- flex gap-x-2 justify-end'>
                        <button onClick={handleModalClick} className={`border border-primary text-primary my-2 flex justify-end text-center text-sm font-semibol px-6 py-2 rounded-full 
                                `}
                        >
                            Cancel
                        </button>


                        <button type="submit"
                            disabled={loading}
                            className={`bg-[#0085D2] hover:bg-opacity-80 text-white text-sm font-semibold px-6 py-1 rounded-full ${loading ? 'opacity-50' : ''}`}
                        >
                            Submit
                        </button>

                    </div>

                </form>
            </div>
        </div >
    )
}
