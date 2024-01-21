import { BASE_API_URL } from "@/app/lib/userdb"

async function getusersdetails() {
    let userdata = await fetch(`${BASE_API_URL}/api/users`,{cache:'no-store'});
    userdata = await userdata.json();
    return userdata.users;
}

export default async function Record() {

    const users = await getusersdetails();
    console.log(users);

    return (
        <main>
            <div className="container" >
                <div className="text-center p-5">
                    <h1>Users Record</h1>
                </div>
                <div className="table-responsive" style={{height:'36rem'}}>
                <table className="table table-bordered table-hover text-center">
                    <thead className="table-dark">
                        <tr>
                            <td>NO</td>
                            <td>Full Name</td>
                            <td>Email id</td>
                            <td>Phone Number</td>
                            <td>Password</td>
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
                                        <td>{item.phone}</td>
                                        <td>{item.password}</td>
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