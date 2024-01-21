"use client"
import { useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import { BASE_API_URL } from "./lib/userdb";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  const [name, setname] = useState("");
  const [mail, setmail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [type, setType] = useState('password');


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

  // Color Change //

  const [color_name, setcolor_name] = useState("red");
  const [color_mail, setcolor_mail] = useState("red");
  const [color_phone, setcolor_phone] = useState("red");
  const [color_password, setcolor_password] = useState("red");

  useEffect(() => {
    uservalidation();
  }, [name, mail, phone, password]);

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
  

   const  submit = async() => {
    if (!isFormValid) {
      alert("Plz Feels Data");
    }
    else {
      try{

        const dataexits =  await fetch(`${BASE_API_URL}/api/usersexits`,{
          method:'POST',
          body:JSON.stringify({mail,phone})
        });

        const { user_mail,user_phone } = await dataexits.json();

        if(user_mail){
          alert("Email alrady exits");
          setmail_check('/circle-xmark-regular.svg');
          setcolor_mail('red');
          console.log(user_mail);
          return ;
        }

        if(user_phone){
          alert("Phone Number alrady exits");
          setphone_check('/circle-xmark-regular.svg');
          setcolor_phone('red');
          console.log(user_phone);
          return ;
        }

        let data = await fetch(`${BASE_API_URL}/api/users`,{
          method:'POST',
          body:JSON.stringify({name,mail,phone,password})
        });
        

        data = await data.json();
        console.log(data);
        alert("SuccessFull Register Data");
        router.push('/users_data')
      }
      catch (error){
        alert('Failed to sign up the user');
      }
    }
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
                  <h1>Register</h1>
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
                    style={{textTransform:'capitalize',borderBottom:`1.8px solid ${color_name}`}} />
                  <div className="error_message">
                    {
                      <img className="mx-2" src={name_check} />
                    }
                    {
                      error.name &&
                      <span style={{color:color_name}}>
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
                    style={{borderBottom:`1.8px solid ${color_mail}`}}
                  />
                  <div className="error_message">
                    {
                      <img className="mx-2" src={mail_check} />
                    }
                    {
                      error.mail &&
                      <span  style={{color:color_mail}}>
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
                    style={{borderBottom:`1.8px solid ${color_phone}`}}
                    maxLength={10}
                  />
                   <div className="error_message">
                    {
                      <img className="mx-2" src={phone_check} />
                    }
                    {
                      error.phone &&
                      <span  style={{color:color_phone}}>
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
                    style={{borderBottom:`1.8px solid ${color_password}`}}
                    onChange={(e) => setpassword(e.target.value)}
                  />
                   <div className="error_message">
                    {
                      <img className="mx-2" src={password_check} />
                    }
                    {
                      error.password &&
                      <span  style={{color:color_password}}>
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
                      <input type="submit" value="Register" className="register-btn" onClick={submit} />
                    </div>
                    <div>
                      <button className="login-btn">
                        <span className="px-1" >
                          <Link href='/login' style={{ color: 'white', textDecoration: 'none' }}>Login</Link>
                        </span>
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


