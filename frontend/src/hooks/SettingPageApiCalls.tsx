
import {useEffect, useState} from "react";
import axios from "axios";
import {Week} from "../model/Week";
import {useNavigate} from "react-router-dom";

type SettingPageApiCallsProps ={
    username: string
}

type UserDataTyp = {
    id?: string
    username: string,
    gender: string,
    birthday: Date,
    userWeight?: Set<{ date: Date, weight: number }>,
    userHeight: number,
    weekPlanlist?: Week[],
    exercises?: Set<{ id: string, description: string, repeats: number, sets: number, weight: number }>
    registerData: Date,
    password?: string
}

const emptyUserData = {
    id: "",
    username: "",
    gender: "MALE",
    birthday: new Date(),
    userWeight: new Set<{ date: Date, weight: number }>(),
    userHeight: 0,
    weekPlanlist: [],
    exercises: new Set<{ id: string, description: string, repeats: number, sets: number, weight: number }>(),
    registerData: new Date(),
    password: ""
}

export default function SettingPageApiCalls(props: SettingPageApiCallsProps){
    const navigate = useNavigate()

    const [userData, setUserData] = useState<UserDataTyp>(emptyUserData)

    useEffect(() => {
        if(props.username){
            getUserData()
        }
        //eslint-disable-next-line
    },[props.username])

    function getUserData() {
        axios.get("/api/users/" + props.username)
            .then(response => response.data)
            .then(data => {
                setUserData(data)
            })
            .catch(error => console.error(error))
    }

    function submitUsername(newUsername: string) {
        axios.put("/api/users/" + props.username + "/updateusername/", newUsername,
            {headers: {"Content-type": "text/plain"}})
            .catch(error => console.error(error))
            .then(() => navigate("/login"))
    }

    return {userData, submitUsername}
}