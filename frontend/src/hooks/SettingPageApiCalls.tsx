import UseUser from "./UseUser";
import {useEffect, useState} from "react";
import axios from "axios";
import {Week} from "../model/Week";
import {useNavigate} from "react-router-dom";

export default function SettingPageApiCalls(){
    const {username} = UseUser()
    const navigate = useNavigate()

    const [currentUsername, setCurrentUsername] = useState<string>("")

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

    const initUserData = {
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

    const [userData, setUserData] = useState<UserDataTyp>(initUserData)

    useEffect(() => {
        if(username !== undefined && username !== ""){
            setCurrentUsername(username);
        }
        //eslint-disable-next-line
    },[])

    useEffect(() => {
        if(currentUsername !== undefined && currentUsername !== ""){
            getUserData()
        }
        //eslint-disable-next-line
    },[currentUsername])

    function getUserData() {
        axios.get("/api/users/" + currentUsername)
            .then(response => response.data)
            .then(data => {
                setUserData(data)
            })
            .catch(error => console.error(error))
    }

    function submitUsername(newUsername: string) {
        axios.put("/api/users/" + currentUsername + "/updateusername/", newUsername,
            {headers: {"Content-type": "text/plain"}})
            .catch(error => console.error(error))
            .then(() => navigate("/login"))
    }

    return {currentUsername, userData, submitUsername}
}