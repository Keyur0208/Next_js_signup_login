"use client"
import React from "react"
import { BASE_API_URL } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";

async function userdeatils(id) {
    let data = await fetch(`${BASE_API_URL}/api/login/${id}`,{cache:"no-store"})
    data = await data.json();
    return data.users;
}

export default async function Users({ params }) {

    const route = useRouter();

    const user = await userdeatils(params.id);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="bg-light p-5" style={{borderRadius:'20px'}} >
                    <h1 style={{ fontWeight: '500' }} >User Information</h1>
                    <div className="text-center mt-4">
                        <h6>Full Name : {user.name} </h6>
                        <h6>Email Id  : {user.mail} </h6>
                        <h6>Phone No  : {user.phone} </h6>
                        <h6>Password  : {user.password}</h6>
                    </div>
                    <div className="text-center mt-5">
                        <button className="btn btn-danger" onClick={()=>route.push('/')} >Log Out</button>
                    </div>
                </div>
            </div>
        </div>

    )
}
