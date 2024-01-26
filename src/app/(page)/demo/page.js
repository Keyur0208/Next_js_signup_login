"use client"
import React from 'react'
import Swal from 'sweetalert2';


const page = () => {

  function submit() {
    Swal.fire({
      title: "Good job!",
      text: "You clicked the button!",
      icon: "success"
    });
  }

  return (
    <div>
      <button onClick={submit} >Ok</button>
    </div>
  )
}

export default page