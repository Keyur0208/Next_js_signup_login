"use client"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Link from "next/link"
import { BASE_API_URL } from "@/app/lib/userdb";
import { useRouter } from "next/navigation";

export default function Login() {

  const router = useRouter();

  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [type, settype] = useState('password');

  const showpassword = () => {
    if (type === 'password') {
      settype('text')
    }
    else {
      settype('password')
    }
  };

  const [error, seterror] = useState({});
  const [mail_check, setmail_check] = useState("/circle-xmark-regular.svg");
  const [password_check, setpassword_check] = useState("/circle-xmark-regular.svg");
  const [isFormValid, setisFormValid] = useState(false);

  // Color Change //

  const [color_mail, setcolor_mail] = useState("red");
  const [color_password, setcolor_password] = useState("red");

  useEffect(() => {
    loginvalidation()
  }, [mail, password]);

  const loginvalidation = () => {

    let error = {}

    if (!mail) {
      error.mail = "Email Requried";
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

    if (!password) {
      error.password = "Password Requried";
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

  const login = async() => {

    if (!isFormValid) {
      alert('Error');
    }
    else {
      try {
        let data = await fetch(`${BASE_API_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify({ mail, password })
        })

        const { user_mail, user_password } = await data.json();

        if (user_mail && user_password) {
          alert("SucessFull Login");
          console.log(user_mail);
          console.log(user_password);
          router.push('/users_data');
          return ;
        }
        else if(!user_mail && !user_password){
          setcolor_mail("red");
          setmail_check('/circle-xmark-regular.svg');
          setcolor_password("red");
          setpassword_check("/circle-xmark-regular.svg");
          alert("Email and Password Incorrect");
          return;
        }
        else if(user_mail && !user_password){
          setcolor_password("red");
          setpassword_check("/circle-xmark-regular.svg");
          alert("Password Incorrect");
          return;
        }
      }

      catch (error) {
        alert('Failed to sign up the user');
      }
    };
  
  };
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
                  <h1>Login</h1>
                  <p>Dont't have an account ? <a>Create Your account </a> & take less than a minute,</p>
                </div>
                <div className="register-form" >
                  <br></br>
                  <br></br>
                  <input
                    type="mail"
                    placeholder="EMAIL ID"
                    className="register-data"
                    value={mail}
                    onChange={(e) => (setmail(e.target.value))}
                    style={{borderBottom:`1.8px solid ${color_mail}`}}
                  />
                  <div className="error_message">
                    {
                      <img className="mx-2" src={mail_check} />
                    }
                    {
                      error.mail &&
                      <span style={{color:color_mail}}>
                        {error.mail}
                      </span>
                    }
                  </div>

                  <br></br>

                  <input
                    type={type}
                    placeholder="PASSWORD"
                    className="register-data"
                    value={password}
                    onChange={(e) => (setpassword(e.target.value))}
                    style={{borderBottom:`1.8px solid ${color_password}`}}
                  />
                  <div className="error_message">
                    {
                      <img className="mx-2" src={password_check} />
                    }
                    {
                      error.password &&
                      <span style={{color:color_password}}>
                        {error.password}
                      </span>
                    }
                  </div>

                  <input type="checkbox" className="mt-3" onClick={showpassword} /> Show Password

                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="button">
                    <div>
                      <input type="submit" value='Login' className="register-btn" onClick={login} />
                    </div>
                    <div>
                      <button className="login-btn">
                        <span className="px-1" >
                          <Link href='/' style={{ color: 'white', textDecoration: 'none' }} >
                            Register
                          </Link>
                        </span>
                        <img src="/arrow-right-solid.svg" />
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
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

