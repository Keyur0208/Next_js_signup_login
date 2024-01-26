"use client"
import { faPenNib } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"

export default function Update_btn(props) {

    const route = useRouter();
    

    const update = async () => {
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
                  route.push(`/login/update/${user_id}`)
                }
              });
              Toast.fire({
                icon: "success",
                title: "Correct Password"
              });
        }
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={update}>
                <FontAwesomeIcon icon={faPenNib} style={{ height: '1.2rem' }} className="px-1" />
                Update
            </button>
        </div>
    )

}