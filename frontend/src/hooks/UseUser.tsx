import {useEffect, useState} from "react";
import axios from "axios";
import {Exercise} from "../model/Exercise";


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
                return response.data
            })
            .then(data => {
                setUserName(data)
                return data
            })
            .catch(error => console.error(error))
    }

    function selectedExercisesList(list: Exercise[]){

        axios.post("/api/user/" + userName + "/exercises/", list)
            .catch(error => console.error(error))
    }

    return {userName, login, selectedExercisesList}
}