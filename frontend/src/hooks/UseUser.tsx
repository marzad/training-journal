import {useEffect, useState} from "react";
import axios from "axios";


export default function UseUser(){

    const [userName, setUserName] = useState()

    useEffect(() => {
        axios.get("/api/user")
            .then(response => response.data)
            .then(setUserName)
    }, [])

    function login(username: string, password: string){
        console.log(username + " " + password)
        return axios.post("/api/user/login",
            undefined,
            {
                auth: {
                    username,
                    password
                }
            })
            .then(response => response.data)
            .then(data => {
                setUserName(data)
                return data
            })
    }

    return {userName, login}
}