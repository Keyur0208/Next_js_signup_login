"use client"
import React from "react"
import { useRouter } from "next/navigation"

export default function Users() {
    const Router = useRouter();
    const navigation = () =>{
         return (Router.push('/'))
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="bg-light p-5" style={{borderRadius:'20px'}} >
                    <h1 style={{ fontWeight: '500' }} >User Information</h1>
                    <div className="text-center mt-4">
                        <h6>Full Name : Keyur Pansuriya</h6>
                        <h6>Email Id  : k@gmail.com</h6>
                        <h6>Phone No  : 95377 35095</h6>
                        <h6>Password  : k@88</h6>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn btn-danger" onClick={navigation} >Log Out</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
