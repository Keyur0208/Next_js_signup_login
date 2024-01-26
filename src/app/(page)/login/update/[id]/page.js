"use client"
import { useState, useEffect } from "react"
import React from "react"
import { useRouter } from "next/navigation";
import '@/app/(page)/style/popup.css'
import { BASE_API_URL } from "@/app/lib/userdb";
import Swal from "sweetalert2";
import { Html } from "next/document";

export default function User_Update(props) {

    const router = useRouter();
    const [name, setname] = useState("");
    const [mail, setmail] = useState("");
    const [phone, setphone] = useState("");
    const [password, setpassword] = useState("");
    const [type, setType] = useState('password');
    const [color_name, setcolor_name] = useState("red");
    const [color_mail, setcolor_mail] = useState("red");
    const [color_phone, setcolor_phone] = useState("red");
    const [color_password, setcolor_password] = useState("red");
    const [loading, setloading] = useState(false)
    const [back, setback] = useState(false);


    const showpassword = () => {
        if (type === 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }

    const [error, seterror] = useState({});
    const [name_check, setname_check] = useState("/circle-xmark-regular.svg");
    const [mail_check, setmail_check] = useState("/circle-xmark-regular.svg");
    const [phone_check, setphone_check] = useState("/circle-xmark-regular.svg");
    const [password_check, setpassword_check] = useState("/circle-xmark-regular.svg");
    const [isFormValid, setisFormValid] = useState(false);


    useEffect(() => {
        uservalidation();
    }, [name, mail, phone, password]);

    useEffect(() => {
        getuserdetails();
    }, [])

    const getuserdetails = async () => {
        let user_id = props.params.id;
        let user_data = await fetch(`${BASE_API_URL}/api/login/` + user_id);
        user_data = await user_data.json();

        if (user_data.sucess) {
            setname(user_data.users.name);
            setmail(user_data.users.mail);
            setphone(user_data.users.phone);
            setpassword(user_data.users.password);
        }
        else {
            console.log("Not Data Update");
        }
    }

    const uservalidation = () => {
        let error = {};

        if (!name) {
            error.name = "Full Name  Required";
            setname_check('/circle-xmark-regular.svg');
            setcolor_name('red');
        }
        else {
            setname_check('/circle-check-regular.svg');
            setcolor_name('green');
        }

        if (!mail) {
            error.mail = "Email  Required";
            setmail_check('/circle-xmark-regular.svg');
            setcolor_mail('red');
        }
        else if (!/\S+@\S+\.\S+/.test(mail)) {
            error.mail = "xyz@gmail.com";
            setmail_check('/circle-xmark-regular.svg');
            setcolor_mail('red');
        }
        else {
            setmail_check('/circle-check-regular.svg');
            setcolor_mail('green');
        }

        if (!phone) {
            error.phone = "Phone No Required";
            setphone_check('/circle-xmark-regular.svg');
            setcolor_phone('red');
        }
        else if (isNaN(phone)) {
            error.phone = "Numerical Requried";
            setphone_check('/circle-xmark-regular.svg');
            setcolor_phone('red');
        }
        else if (phone.length < 10) {
            error.phone = "Must Be 10 Digit";
            setphone_check('/circle-xmark-regular.svg');
            setcolor_phone('red');
        }
        else {
            setphone_check('/circle-check-regular.svg');
            setcolor_phone('green');
        }

        if (!password) {
            error.password = "Password  Required";
            setpassword_check('/circle-xmark-regular.svg');
            setcolor_password('red');
        }
        else {
            setpassword_check('/circle-check-regular.svg');
            setcolor_password('green');
        }

        seterror(error);
        setisFormValid(Object.keys(error).length === 0);
    }

    const update_btn = async () => {

        if (!isFormValid) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Feels Blacks Form!",
            });
        }
        else {
            try {
                setloading(true);
                let user_id = props.params.id;
                let data = await fetch(`${BASE_API_URL}/api/login/` + user_id, {
                    method: "PUT",
                    body: JSON.stringify({ name, mail, phone, password })
                });
                data = await data.json();
                console.log(data);

                if (data.users) {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Email is Alerady Exits Please Again Try",
                    });
                    setloading(false);
                }
                else {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                            router.push(`/login/${user_id}`);
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Update in successfully"
                    });
                }
            }
            catch (error) {
                alert("Failed to update the user")
            }

        }
    }

    // Back Btn //

    const back_btn = () => {
        setback(true);
        router.push('/login');
    }


    return (
        <main>
            <div className="container register-section">
                <div className="register-from">
                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-4 col-lg-4 col-xl-4 left-section">
                            <div className="image-text">
                                <h2>Hello</h2>
                                <h1>World</h1>
                                <p>-- By Keyur Pansuriya</p>
                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 right-section">
                            <div className="right-space">
                                <div className="register-title" >
                                    <h1>Update User</h1>
                                    <p>Dont't have an account ? <a>Create Your account </a> & take less than a minute,</p>
                                </div>

                                <div className="register-form" >
                                    <input
                                        type="text"
                                        placeholder="FULL NAME"
                                        className="register-data"
                                        value={name}
                                        onChange={(e) => setname(e.target.value)}
                                        autoFocus
                                        style={{ textTransform: 'capitalize', borderBottom: `1.8px solid ${color_name}` }} />
                                    <div className="error_message">
                                        {
                                            <img className="mx-2" src={name_check} />
                                        }
                                        {
                                            error.name &&
                                            <span style={{ color: color_name }}>
                                                {error.name}
                                            </span>
                                        }
                                    </div>
                                    <br></br>
                                    <input
                                        type="mail"
                                        placeholder="EMAIL ID"
                                        className="register-data"
                                        value={mail}
                                        onChange={(e) => setmail(e.target.value)}
                                        style={{ borderBottom: `1.8px solid ${color_mail}` }}
                                    />
                                    <div className="error_message">
                                        {
                                            <img className="mx-2" src={mail_check} />
                                        }
                                        {
                                            error.mail &&
                                            <span style={{ color: color_mail }}>
                                                {error.mail}
                                            </span>
                                        }
                                    </div>
                                    <br></br>
                                    <input
                                        type="text"
                                        placeholder="PHONE NO"
                                        className="register-data"
                                        value={phone}
                                        onChange={(e) => setphone(e.target.value)}
                                        style={{ borderBottom: `1.8px solid ${color_phone}` }}
                                        maxLength={10}
                                        inputMode="number"
                                    />
                                    <div className="error_message">
                                        {
                                            <img className="mx-2" src={phone_check} />
                                        }
                                        {
                                            error.phone &&
                                            <span style={{ color: color_phone }}>
                                                {error.phone}
                                            </span>
                                        }
                                    </div>
                                    <br></br>
                                    <input
                                        type={type}
                                        placeholder="PASSWORD"
                                        className="register-data"
                                        value={password}
                                        style={{ borderBottom: `1.8px solid ${color_password}` }}
                                        onChange={(e) => setpassword(e.target.value)}
                                    />
                                    <div className="error_message">
                                        {
                                            <img className="mx-2" src={password_check} />
                                        }
                                        {
                                            error.password &&
                                            <span style={{ color: color_password }}>
                                                {error.password}
                                            </span>
                                        }
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="mt-3"
                                        onClick={showpassword}
                                    /> Show Password
                                    <br></br>
                                    <br></br>
                                    <div className="button">
                                        <div>
                                            <button type="submit" className="register-btn" onClick={update_btn} >
                                                {loading ? "" : 'Update'}
                                                {loading && <div className="spinner-border text-light"></div>}
                                            </button>
                                        </div>
                                        <div>
                                            <button className="login-btn fix" onClick={back_btn} >
                                                {back ? "" : 'Back'}
                                                {back && <div className="spinner-border text-light"></div>}
                                                <img src="/arrow-right-solid.svg" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="social-media-section mt-5" >
                                        <div className="social-media-title">
                                            <p>Login With social media </p>
                                        </div>
                                        <div className="social-media-icon-section">
                                            <button className="facebook" >
                                                <img
                                                    src="/facebook-f.svg"
                                                    className="px-2" />
                                                <span>
                                                    Fecebook
                                                </span>
                                            </button>
                                            <button className="twitter" >
                                                <img
                                                    src="/twitter.svg"
                                                    className="px-2" />
                                                <span>
                                                    Twiter
                                                </span>
                                            </button>
                                            <button className="linkedin" >
                                                <img
                                                    src="/linkedin-in.svg"
                                                    className="px-2" />
                                                <span>
                                                    Linkedin
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}


