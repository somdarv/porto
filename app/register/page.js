import React from 'react'
import Navigation from '../components/Navigation'
import Registration from '../components/Registration';




export default function page() {

  return (
    <div className='min-h-screen w-full'>
      <div className="w-full h-full bg-[#082431]">
        <Navigation page={"register"} />
      </div>
      <Registration />


    </div>
  )
}
