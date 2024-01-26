"use client"
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Back_page() {

    const route = useRouter();

    return (
        <button className="btn btn-success" onClick={() => route.push('/')} >
            <FontAwesomeIcon icon={faRightFromBracket} style={{ height: '1.2rem' }} className="px-1" />
            Log Out
        </button>
    )
}