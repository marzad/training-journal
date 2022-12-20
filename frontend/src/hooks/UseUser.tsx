import {useEffect, useState} from "react";
import axios from "axios";


export default function UseUser(){

    const [userName, setUserName] = useState()

    useEffect(() => {
        axios.get("/api/user/me")
            .then(response => response.data)
            .then(setUserName)
    }, [])

    function login(username: string, password: string){
        return axios.post("/api/user/login",
            undefined,
            {
                auth: {
                    username,
                    password
                }
            })
            .then(response => {
                console.log("Login: ", response.data)
                return response.data
            })
            .then(data => {
                setUserName(data)
                return data
            })
            .catch(error => console.error("Fehler:", error))
    }

    return {userName, login}
}