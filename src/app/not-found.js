"use client"
import { useRouter } from 'next/navigation'
import React from 'react'


const not_found = () => {

  const route = useRouter();

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="bg-light p-5" style={{borderRadius:'20px'}} >
                    <h1 style={{ fontWeight: '500' }} >Not Found Page</h1>
                    <div className="text-center mt-3">
                        <button className="btn btn-danger btn-lg" onClick={()=>route.push('/')} >Home</button>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default not_found