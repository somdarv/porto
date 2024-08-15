'use client'

import React from 'react';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';


export default function Registration() {

  // Initializing Formik
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validationSchema: Yup.object({
      userName: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .max(15, 'Username must be 15 characters or less')
        .required('Please provide a username'),

      email: Yup.string()
        .email('Invalid email address')
        .required('Please provide an email address'),

      password: Yup.string()
        .min(8, 'Password must be at least 8 characters long')
        .required('Please provide a password'),

      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
    }),

    onSubmit: values => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        formik.setSubmitting(false); // Stop submitting state after submission
      }, 1000);
    }
  });
  return (
    <div className='min-h-screen w-full'>
      {/* Main content */}
      <div className='flex'>
        <div className='w-[30%] h-screen regImage'>
          <Image
            src={'/reg.png'}
            alt='image'
            width={500}
            height={200}
            className='w-full'
          />
        </div>

        <div className='w-[70%] flex items-center justify-center'>
          <div className='w-full'>
            <div>
              <h1 className='font-semibold text-center text-3xl'>Sign Up</h1>
              <p className='text-center my-3'>Already have an Account? <span className='text-[#0085D2] cursor-pointer'><Link href={'/login'}>Login</Link></span></p>
            </div>

            <div className='my-8 w-[28%] mx-auto'>
              <form onSubmit={formik.handleSubmit}>
                <div className={`border-b-2 my-2 focus-within:border-[#0085D2] ${formik.touched.userName && formik.errors.userName ? 'border-red-400': ''}`}>
                  <input
                    id='userName'
                    type="text"
                    name="userName"
                    className='my-2 px-2 outline-none w-full'
                    placeholder='Username eg: QuickSilver'
                    value={formik.values.userName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.userName && formik.errors.userName ? (
                  <div className="text-red-500 text-sm">{formik.errors.userName}</div>
                ) : null}

                <div className={`border-b-2 my-2 focus-within:border-[#0085D2] ${formik.touched.email && formik.errors.email ? 'border-red-400': ''}`}>
                  <input
                    type="email"
                    name="email"
                    className='my-2 px-2 outline-none w-full'
                    placeholder='Email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">{formik.errors.email}</div>
                ) : null}

                <div className={`border-b-2 my-2 focus-within:border-[#0085D2] ${formik.touched.password && formik.errors.password ? 'border-red-400': ''}`}>
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

                <div className={`border-b-2 my-2 focus-within:border-[#0085D2] ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-400': ''}`}>
                  <input
                    type="password"
                    name="confirmPassword"
                    className='my-2 px-2 outline-none w-full'
                    placeholder='Confirm Password'
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                  />
                </div>
                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                  <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
                ) : null}

                <div className='flex justify-center'>
                <button 
                    type="submit"
                    disabled={formik.isSubmitting || !formik.isValid}
                    className={`bg-white my-4 flex text-center text-sm font-semibold  px-12 py-3 rounded-full border-2
                    ${ !formik.isValid ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white '}
                    ${formik.isSubmitting ? 'bg-[#0085D2] text-white' :'' }`}
                  >
                    {formik.isSubmitting ? <FaSpinner className="animate-spin" /> : 'Submit'}
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
      </div>
    </div>
  )
}
