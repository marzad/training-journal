import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PersonalDataApiCalls(){
    const navigate = useNavigate()

    const [userWeightList, setUserWeightList] = useState<{date: Date, weight: number}[]>([])

    function getUserWeightData(username: string) {
        return axios.get("api/users/" + username + "/weight")
            .then(response => response.data)
            .then(data => {
                setUserWeightList(data)
            })
            .catch(error => console.error(error))
    }

    function submitUserWeightData(username: string, userWeight: number, newUsername: string){

        if (userWeight > 0.5) {
            axios.put("/api/users/" + username + "/updateweight/", userWeight,
                {headers: {"Content-type": "text/plain"}})
                .then(response => response.data)
                .then(data => {
                    setUserWeightList(data)
                })
                .catch(error => console.error(error))
        } else {
            axios.put("/api/users/" + username + "/updateusername/", newUsername,
                {headers: {"Content-type": "text/plain"}})
                .catch(error => console.error(error))
                .then(() => navigate("/menu"))
        }
    }

    return {userWeightList, submitUserWeightData, getUserWeightData}
}