import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useEffect} from "react";

export default function LogoutPage(){

    useEffect(() => {
        logout().then(() => navigation("/login"))
        //eslint-disable-next-line
    },[])

    const navigation = useNavigate()

    function logout(){
        return axios.post("/api/users/logout")
            .then(() => navigation("/login"))
            .catch(error => console.error(error))
    }

     return(
         <>
         </>
     )
}