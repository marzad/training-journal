import {useEffect, useState} from "react";


export default function UseUser(){

    const [userName, setUserName] = useState()

    useEffect(() => {
        login("StandardUser", "password")
    }, [])

    function login(username: string, password: string){
        return username
    }

    return {userName, login}
}