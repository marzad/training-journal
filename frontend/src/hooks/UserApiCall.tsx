import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

export default function UserApiCall(){

    const navigate = useNavigate()
    const [username, setUsername] = useState("anonymous")

    useEffect(() => {
        getUsername()
    }, [])

    function getUsername(){
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUsername)
            .catch(error => console.error(error))
    }

    function login(username: string, password: string){
        return axios.post("/api/users/login",
            undefined,
            {
                auth: {
                    username,
                    password
                }
            })
            .then(response => {
                setUsername(response.data)
                return response.data
            })
            .catch(error => console.error(error))
    }

    function logout(){
        axios.post("/api/users/logout")
            .then(() => navigate("/login"))
            .catch(error => console.error(error))
    }

    return {username, login, logout}
}