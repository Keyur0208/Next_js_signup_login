import Password_check from "@/app/componets/check_password";
import Delete_user from "@/app/componets/delete";
import Update_btn from "@/app/componets/update_btn";
import { BASE_API_URL } from "@/app/lib/userdb"

async function getusersdetails() {
    let userdata = await fetch(`${BASE_API_URL}/api/users`, { cache: 'no-store' });
    userdata = await userdata.json();
    return userdata.users;
}

export default async function Record() {

    const users = await getusersdetails();
    console.log(users);


    return (
        <main>
            <div className="container-fluid" >
                <div className="text-center p-5">
                    <h1>Users Record</h1>
                </div>
                <div style={{overflowX:'auto'}}>
                    <table className="table table-bordered table-hover text-center">
                        <thead className="table-dark">
                            <tr>
                                <td>NO</td>
                                <td>Full Name</td>
                                <td>Email id</td>
                                <td>Password</td>
                                <td>Update</td>
                                <td>Delete</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item) => {
                                    return (
                                        <tr>
                                            <td className="text-center fs-5">*</td>
                                            <td>{item.name}</td>
                                            <td>{item.mail}</td>
                                            <td><Password_check password={item.password} phone={item.phone} /></td>
                                            <td><Update_btn password={item.password}  id={item._id}/></td>
                                            <td><Delete_user password={item.password}  id={item._id} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </main>
    )
}