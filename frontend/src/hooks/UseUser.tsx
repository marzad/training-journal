import {useEffect, useState} from "react";
import axios from "axios";
import {ExerciseDTO} from "../model/ExerciseDTO";


export default function useUser(){

    const [userName, setUserName] = useState()

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUserName)
    }, [])

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
                setUserName(response.data)
                return response.data
            })
            .catch(error => console.error(error))
    }

    function submitSelectedExercisesList(list: ExerciseDTO[]){

        axios.post("/api/users/" + userName + "/exercises/", list)
            .catch(error => console.error(error))
    }

    return {userName, login, selectedExercisesList: submitSelectedExercisesList}
}