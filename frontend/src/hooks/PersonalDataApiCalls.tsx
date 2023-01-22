import axios from "axios";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export default function PersonalDataApiCalls() {
    const navigate = useNavigate()

    const [userWeightList, setUserWeightList] = useState<{ date: Date, weight: number, bmi: number }[]>([])
    const [username, setUsername] = useState()

    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    }, [])

    function getUsername() {
        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUsername)
    }

    useEffect(() => {
        if (username !== undefined) {
            getUserWeightData()
                .then(() => dataMap())
                .catch(error => console.error(error))
        }
        //eslint-disable-next-line
    }, [username])

    useEffect(() => {
        dataMap()
        //eslint-disable-next-line
    },[username, userWeightList])

    function getUserWeightData() {
        return axios.get("api/users/" + username + "/weight")
            .then(response => response.data)
            .then(data => {
                setUserWeightList(data)
            })
    }

    function submitUserWeightData(username: string, userWeight: number, newUsername: string) {

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
    type chartDataType = {
        name: string,
        uv: number,
        pv: number,
        amt: number
    }

    const [chartData, setChartData] = useState<chartDataType[]>([])

    const dataMap = () => {

        userWeightList.map(weightItem => {
            return setChartData(prevState => [...prevState,{name: weightItem.date.toString(), uv: weightItem.bmi, pv: 0, amt: 0}])
        })
    }

    return {username, userWeightList, submitUserWeightData, chartData}
}