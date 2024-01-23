"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


const not_found = () => {

  const route = useRouter();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="bg-light p-5 text-center" style={{borderRadius:'20px'}} >
                    <img src='/404-error-not-found-badge.png' className='w-50' />
                    <div className="text-center mt-3">
                        <button className="btn btn-danger btn-lg" onClick={()=>route.push('/')} >Home</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default not_found