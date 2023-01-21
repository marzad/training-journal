import {useEffect, useState} from "react";
import {Week} from "../model/Week";
import axios from "axios";

export default function UserWeekplansApiCalls(){
    const [userPlans, setUserPlans] = useState<Week[]>()
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    }, [])

    function getUsername() {

        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(data => {
                setUsername(data)
            })
    }

    useEffect(() => {
        if (username !== undefined) {
            getUserPlans()
                .catch(error => console.error(error))
        }
        //eslint-disable-next-line
    }, [username])



    function getUserPlans() {
        return axios.get("/api/users/" + username + "/plans")
            .then(response => response.data)
            .then(setUserPlans)
    }

    return {userPlans}
}