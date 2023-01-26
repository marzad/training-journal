import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function useUserApiCall(){

    const navigate = useNavigate()

    function logout(){
        axios.post("/api/users/logout")
            .then(() => navigate("/login"))
            .catch(error => console.error(error))
    }

    return {logout}
}