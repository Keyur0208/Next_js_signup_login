"use client"
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react"
import Swal from "sweetalert2";

export default function Password_check(props) {

  const [Checkpassword, setChckpassword] = useState("******");

  let phone_value = props.phone;

  async function myfunction() {
    const { value: text } = await Swal.fire({
      title: "Enter your Phone Number",
      input: "text",
      inputPlaceholder: "Enter your Phone Number",
      inputAttributes: {
        maxlength: "10",
        autocapitalize: "off",
        autocorrect: "off"
      }
    });
    if (text != phone_value) {
      setChckpassword("******");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect Password",
      });
    }
    else{
      Swal.fire(`Password  = ${props.password}`);
    }
  }


  return (
    <div className="text-center" >
      <p>{Checkpassword} <FontAwesomeIcon icon={faEye} onClick={myfunction} style={{ height: '1rem' }} /></p>
    </div>
  )

}
