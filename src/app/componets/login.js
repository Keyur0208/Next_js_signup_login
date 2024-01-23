"use client"
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { BASE_API_URL } from "../lib/userdb";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import '@/app/(page)/style/popup.css'

export default function Login() {

  const router = useRouter();
  const [mail, setmail] = useState("");
  const [password, setpassword] = useState("");
  const [type, settype] = useState('password');
  const [color_mail, setcolor_mail] = useState("red");
  const [color_password, setcolor_password] = useState("red");
  const [loading, setloading] = useState(false);
  const [register, setregister] = useState(false);
  const [empty_popup, setempty_popup] = useState(false);
  const [success_popup, setsuccess_popup] = useState(false);
  const [incorrect_popup, setincorrect_popup] = useState(false);
  const [phone_incorrect_popup, setphone_incorrect_popup] = useState(false);

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

  const login_btn = async () => {

    if (!isFormValid) {
      setempty_popup(true);
    }
    else {
      setloading(true);
      try {
        let data = await fetch(`${BASE_API_URL}/api/login`, {
          method: "POST",
          body: JSON.stringify({ mail, password })
        })

        const { user_mail, user_password } = await data.json();

        if (user_mail && user_password) {
          setsuccess_popup(true);
          console.log(user_mail);
          console.log(user_password);
          router.push(`/login/${user_mail._id}`);
          setloading(false);
          return;
        }
        else if (!user_mail && !user_password) {
          setincorrect_popup(true);
          setcolor_mail("red");
          setmail_check('/circle-xmark-regular.svg');
          setcolor_password("red");
          setpassword_check("/circle-xmark-regular.svg");
          setloading(false);
          return;
        }
        else if (user_mail && !user_password) {
          setphone_incorrect_popup(true);
          setcolor_password("red");
          setpassword_check("/circle-xmark-regular.svg");
          setloading(false);
          return;
        }
      }

      catch (error) {
        alert('Failed to sign up the user');
      }
    };
  };
  
  const register_btn = () => {
    setregister(true);
    router.push('/');
  }

  // Popup 

  function Show(props) {
    return (
      <div id="popup1" className="popup-container ">
        <div className="popup-content">
          <span className="close" onClick={Close}>{props.wrong} </span>
          <div className="props-icon" >
            <div>
              <FontAwesomeIcon  icon={faXmarkCircle}  style={{ height: '2rem'}} className={props.color} />
              <p>{props.error}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  function Close(){
    setempty_popup(false);
    setsuccess_popup(false);
    setincorrect_popup(false);
    setphone_incorrect_popup(false);
  }


  return (
    <main>
      {empty_popup && <div> <Show error="Form Blacks Feels"  wrong="&times;"  check_icon={faXmarkCircle} color="red" /> </div>}
      
      {success_popup && <div> <Show error="Sucessfull Form...." wrong="" check_icon={faCheckCircle} color='green' /> </div>}
      
      {incorrect_popup && <div> <Show error="Email and Password Both are Incorrect Please try again"  wrong="&times;"  check_icon={faXmarkCircle} color="red" /> </div>}
      
      {phone_incorrect_popup && <div> <Show error="Incorrect Password The Password that you'r entered is incorrect.Please try again."  check_icon={faXmarkCircle} wrong="&times;"  color="red" /> </div>}

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
                    type={type}
                    placeholder="PASSWORD"
                    className="register-data"
                    value={password}
                    onChange={(e) => (setpassword(e.target.value))}
                    style={{ borderBottom: `1.8px solid ${color_password}` }}
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

                  <input type="checkbox" className="mt-3" onClick={showpassword} /> Show Password

                  <br></br>
                  <br></br>
                  <br></br>
                  <div className="button">
                    <div>
                      <button type="submit" className="login-btn" onClick={login_btn} >
                        {loading ? "" : 'login'}
                        {loading && <div className="spinner-border text-light"></div>}
                      </button>
                    </div>
                    <div>
                      <button className="register-btn fix" onClick={register_btn} >
                        {register ? "" : 'Register'}
                        {register && <div className="spinner-border text-light"></div>}
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

