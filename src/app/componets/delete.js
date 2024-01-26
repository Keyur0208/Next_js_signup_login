"use client"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { BASE_API_URL } from "../lib/userdb";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import '@/app/(page)/style/popup.css'

export default function Delete_user(props) {

    const route = useRouter();

    const deleleapi = async () =>{
        let user_id = props.id;
        let data = await fetch(`${BASE_API_URL}/api/login/${user_id}`, {
            method: "DELETE"
        });
        data = await data.json();
        route.push('/');
    }


    const delete_succefull_mesasage = () => {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
              deleleapi();
            }
          });
          Toast.fire({
            icon: "success",
            title: "Record Delete Successfully"
        });
    }

    const  delete_popup =  async() =>{
        let user_id = props.id;
        console.log(user_id);
        let password_value = props.password;
        let { value: password } = await Swal.fire({
            title: "Enter Your Password",
            input: "password",
            inputPlaceholder: "Enter Your Password",
            inputAttributes: {
                maxlength: "10",
                autocapitalize: "off",
                autocorrect: "off"
            }
        });
        if (password == ""){
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Empty Password",
            });
        }
        else if (password != password_value) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Incorrect Password",
            });
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
                  delete_succefull_mesasage();
                  deleleapi();
                }
              });
              Toast.fire({
                icon: "success",
                title: "Correct Password"
              });
        }
    }

    const deleteuser = async () => {

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: "btn btn-success",
                cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
        });
        swalWithBootstrapButtons.fire({
            title: "Are you sure Delete Record?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                delete_popup();
            }
            else if
                (
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire({
                    title: "Cancelled",
                    icon: "error"
                });
            }
        });
    }
    
    return (
        <div>
            <button className="btn btn-danger" onClick={deleteuser} >
                <FontAwesomeIcon icon={faTrash} style={{ height: '1.2rem' }} className="px-1" />
                Delete
            </button>
        </div>
    )
}
