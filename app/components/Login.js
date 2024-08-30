'use client'

import React from 'react';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Login() {
    const router = useRouter();

    // Initializing Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string()
                // .min(3, 'Username must be at least 3 characters long')
                // .max(15, 'Username must be 15 characters or less')
                .required('Please provide a username or email')
                .email('invalid email address'),
            password: Yup.string().required('Please provide a password'),
        }),

        onSubmit: async (values, { setSubmitting, setFieldError }) => {
            console.log('Submitting form...', values); // Added log
            try {
                const response = await axios.post('http://localhost:5000/api/auth/login', {
                    email: values.email,
                    password: values.password,
                });

                console.log('Login response:', response.data); // Added log

                // The response contains the `token` and `needsOnboarding` flag
                localStorage.setItem('authToken', response.data.token);
                console.log('Login successful! Token:', response.data.token); // Fixed token variable reference

                if (response.data.needsOnboarding) {
                    router.push('/onboarding');
                } else {
                    // router.push('/dashboard');
                    console.log('Login successful! Token:', response.data.token); // Fixed token variable reference
                }
            } catch (error) {
                console.error('Error during login:', error); // Added log
                if (error.response && error.response.data.msg) {
                    setFieldError('user', error.response.data.msg);
                } else {
                    alert('Something went wrong. Please try again later.');
                }
            } finally {
                setSubmitting(false);
            }
        },

    });

    return (
        <div className='min-h-screen w-full'>
            {/* Main content */}
            <div className='flex'>
                <div className='w-[70%] flex items-center justify-center'>
                    <div className='w-full'>
                        <div>
                            <h1 className='font-semibold text-center text-3xl'>Sign In</h1>
                            <p className='text-center my-3'>{`Don't have an Account Yet?`} <span className='text-[#0085D2] cursor-pointer'><Link href={'/register'}>Register</Link></span></p>
                        </div>

                        <div className='my-8 w-[28%] mx-auto'>
                            <form onSubmit={formik.handleSubmit}>
                                <div className={`border-b-2 my-2 focus-within:border-[#0085D2] ${formik.touched.user && formik.errors.user ? 'border-red-400' : ''}`}>
                                    <input
                                        id='email'
                                        type="email"
                                        name="email"
                                        className='my-2 px-2 outline-none w-full'
                                        placeholder=' Email'
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="text-red-500 text-sm">{formik.errors.email}</div>
                                ) : null}

                                <div className={`border-b-2 my-2 focus-within:border-[#0085D2] ${formik.touched.password && formik.errors.password ? 'border-red-400' : ''}`}>
                                    <input
                                        type="password"
                                        name="password"
                                        className='my-2 px-2 outline-none w-full'
                                        placeholder='Password'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                    />
                                </div>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="text-red-500 text-sm">{formik.errors.password}</div>
                                ) : null}

                                <div className='flex justify-center'>
                                    <button
                                        type="submit"
                                        disabled={formik.isSubmitting || !formik.isValid}
                                        className={`bg-[#0085D2] hover:bg-opacity-80 text-white my-4 flex text-center text-sm font-semibold  px-12 py-3 rounded-full border-2
                    ${!formik.isValid ? 'bg-[#0085D2] bg-opacity-30 text-white cursor-not-allowed' : ''}
                    ${formik.isSubmitting ? 'bg-[#0085D2] submitBgColor text-white' : ''}`}
                                    >
                                        {formik.isSubmitting ? <FaSpinner className="animate-spin" /> : 'Login'}
                                    </button>
                                </div>
                            </form>

                            <div className='flex items-center w-[98%] justify-between px- mx-auto'>
                                <div className='border-2 w-[20%]'></div>
                                <p className='text-sm text-gray-400'> or continue with </p>
                                <div className='border-2 w-[20%]'></div>
                            </div>

                            <div className='flex items-center my-2 justify-center'>
                                <div className='w-12 h-12 flex items-center justify-center cursor-pointer rounded-full px-3 py-3 hover:bg-gray-50'>
                                    <FcGoogle className='text-4xl' />
                                </div>
                                <div className='w-12 h-12 flex items-center justify-center cursor-pointer rounded-full px-3 py-3 hover:bg-gray-50'>
                                    <FaFacebook className='text-4xl text-[#0866ff]' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-[30%] h-screen regImage'>
                    <Image
                        src={'/logimg.jpg'}
                        alt='image'
                        width={500}
                        height={200}
                        className='w-full object-cover h-full'
                    />
                </div>
            </div>
        </div>
    )
}
