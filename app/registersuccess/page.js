import Image from 'next/image'
import Link from 'next/link'
import React from 'react'


export default function page() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <div className='flex justify-center'>
                    <Link href={'/#'}>
                        <button className='flex gap-x-2 my-8  items-center justify-center'>
                            <Image
                                src={'/favicon.png'}
                                width={30}
                                height={30}
                                alt='logo'
                            />

                            <h1 className='font-semibold text-2xl'>Porto</h1>
                        </button>
                    </Link>
                </div>



                <div className='my-8'>
                    <h1 className='font-semibold text-center text-2xl'>Registration Successfull!</h1>
                </div>

                <div className='flex items-center justify-center my-4'>
                    <Image
                        src={'/account.svg'}
                        width={200}
                        height={200}
                        alt='account'
                    />

                </div>
                < p className='w-[55%] mx-auto text-sm text-center'>Great, you may now login to continue building your portfolio.
                    Please note that you would be required to verify your email later.
                </p>

                <div className='flex my-8 justify-center items-center'>
                    <button className='bg-[#0085D2] text-white hover:bg-opacity-80 px-8 py-3 rounded-full my-4'>
                        <Link href={'/login'}>
                            Login
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    )
}
