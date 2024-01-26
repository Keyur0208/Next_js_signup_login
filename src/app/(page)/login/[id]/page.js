import React from "react"
import { BASE_API_URL } from "@/app/lib/userdb";
import '@/app/(page)/style/user_deatils.css'
import '@/app/(page)/style/popup.css'
import Delete_user from "@/app/componets/delete";
import Back_page from "@/app/componets/back";
import Update_btn from "@/app/componets/update_btn";

async function userdeatils(id) {
    let data = await fetch(`${BASE_API_URL}/api/login/${id}`, { cache: "no-store" })
    data = await data.json();
    return data.users;
}

export default async function Users({ params }) {

    const user = await userdeatils(params.id);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
                <div className="bg-light p-5" style={{ borderRadius: '20px' }} >
                    <div className="text-center mt-4">
                        <div className="profile-border" >
                            <img src="/profile.png" className="profile" />
                        </div>
                        <h3 className="user_heading" >{user.name}</h3>
                        <h6>Email : {user.mail} </h6>
                        <h6>Phone No  : {user.phone} </h6>
                        <h6>Password  : {user.password}</h6>
                    </div>
                    <div className="text-center mt-5 btn-group">
                        <div>
                           <Back_page/>
                        </div>
                        <div>
                            <Update_btn password={user.password}  id={user._id} />
                        </div>
                        <div>
                            <Delete_user password={user.password} id={user._id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
