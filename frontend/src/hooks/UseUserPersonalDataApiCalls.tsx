
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type SettingPageApiCallsProps ={
    username: string
}

type UserDataTyp = {
    username: string,
    gender: string,
    birthday: Date,
    userHeight: number,
    registerData: Date,
}

const emptyUserData = {
    username: "",
    gender: "MALE",
    birthday: new Date(),
    userHeight: 0,
    registerData: new Date(),
}

export default function useUserPersonalDataApiCalls(props: SettingPageApiCallsProps){
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