import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';


export default function ProfessionalComponent({ step, setStep, professionalName, setProfessionalName, onSubmit }) {
    // Define the validation schema using Yup
    const validationSchema = Yup.object({
        professionalName: Yup.string()
            .required('Professional name is required')
            .min(2, 'Professional name must be at least 2 characters long'),
    });

    // Initialize Formik with initial values, validation schema, and onSubmit handler
    const formik = useFormik({
        initialValues: {
            professionalName: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Submitting Form with Professional Name:', values.professionalName);
            setProfessionalName(values.professionalName);
            onSubmit(values.professionalName);  // Pass the name directly to the onSubmit handler
        },
    });


    return (
        <div className='w-full flex items-center'>
            <div className='w-full'>
                <div className='flex items-center justify-between'>
                    <div className='w-full'>
                        <form className='w-full' onSubmit={formik.handleSubmit}> {/* Ensure handleSubmit is used here */}
                            <div className='w-full flex items-center justify-between'>
                                <div className='w-full'>
                                    <div className={`rounded-md flex items-center ${formik.touched.professionalName && formik.errors.professionalName ? 'border-red-500 border-2' : 'border-gray-400  border'} py-2 px-2 w-[80%]`}>
                                        <input
                                            id='professionalName'
                                            name='professionalName'
                                            value={formik.values.professionalName}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            type="text"
                                            placeholder='Enter Your Professional Name'
                                            className='w-full outline-none'
                                        />
                                    </div>
                                    {formik.touched.professionalName && formik.errors.professionalName ? (
                                        <div className="text-red-500 text-sm mt-1">
                                            {formik.errors.professionalName}
                                        </div>
                                    ) : null}
                                </div>
                            </div>
                            <div className='my-8'>
                                <button
                                    type="submit"  // Ensure the button is of type "submit" to trigger Formik's handleSubmit
                                    className={`bg-primary rounded-full text-white text-sm px-8 py-2 ${!formik.isValid || !formik.dirty ? 'bg-opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={!formik.isValid || !formik.dirty} // Disable if the form is not valid or not dirty
                                >
                                    Finish
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
