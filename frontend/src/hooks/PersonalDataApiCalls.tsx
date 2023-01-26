import axios from "axios";
import {useEffect, useState} from "react";

type chartDataType = {
    date: string,
    bmi: number,
    weight: number
}


export default function PersonalDataApiCalls() {

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
        if (username) {
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

    function submitUserWeightData(username: string, userWeight: number) {

        if (userWeight > 0.5) {
            axios.put("/api/users/" + username + "/updateweight/", userWeight,
                {headers: {"Content-type": "text/plain"}})
                .then(response => response.data)
                .then(data => {
                    setUserWeightList(data)
                })
                .catch(error => console.error(error))
        }
    }

    const [chartData, setChartData] = useState<chartDataType[]>([])

    const dataMap = () => {
        setChartData(userWeightList.map(weightItem => {
            return {date: weightItem.date.toString(), bmi: weightItem.bmi, weight: weightItem.weight}
        }))
    }

    return {username, userWeightList, submitUserWeightData, chartData}
}