'use client'

import Link from "next/link";
import React, { useState } from "react";



export default function Navigation({ page }) {

  const [currentPage, setCurrentPage] = useState(page)

  return (
    <div className="w-[80%] justify-between flex items-center mx-auto py-4">
      <div>
        <Link href={'/#'}>
          <button className="font-semibold text-white text-2xl">PORTO</button>
        </Link>
      </div>

      <div className="gap-x-8 flex items-start">
        <Link href={'/#'}>
          <button className={`${currentPage === 'home' ? 'text-white text-lg pb-2 border-b-2 border-white' : 'text-white text-lg'} " " `}>
            Home
          </button>
        </Link>

        <Link href={'/about'}>
          <button className={`${currentPage === 'about' ? 'text-white text-lg pb-2 border-b-2 border-white' : 'text-white text-lg'} " " `}>
            About
          </button>
        </Link>

        <Link href={'/contact'}>
          <button className={`${currentPage === 'contact' ? 'text-white text-lg pb-2 border-b-2 border-white' : 'text-white text-lg'} " " `}>
            Contact
          </button>
        </Link>

      </div>

      <div className="flex items-center gap-x-4">

        {
          currentPage === 'login' &&
          (<div>
            <Link href={'/register'}>
              <button className="bg-white px-3 py-2 rounded-full text-sm font-semibold">
                Get Started
              </button>
            </Link>
          </div>
          )
        }


        {
          currentPage === 'register' &&

          (<div>  <Link href={'/login'}>
            <button className="text-white gap-x-2 flex text-base">
              Login
            </button>
          </Link></div>)
        }


        {
          currentPage !== 'login' && currentPage !== 'register' && (
            <div className="flex items-center gap-x-4">
              <div>
                <Link href={'/login'}>
                  <button className="text-white gap-x-2 flex text-base">
                    Login
                  </button>
                </Link>
              </div>

              <div>
                <Link href={'/register'}>
                  <button className="bg-white px-3 py-2 rounded-full text-sm font-semibold">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>)
        }



      </div>









    </div>
  );
}
