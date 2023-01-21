import {useEffect, useState} from "react";
import {Week} from "../model/Week";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Day} from "../model/Day";

type UserWeekplansProps = {
    weekId: (id: string) => void,
    dailyPlans: (plans: Set<Day>) => void
}

export default function UserWeekplans(props: UserWeekplansProps){

    const [userPlans, setUserPlans] = useState<Week[]>()
    const [username, setUsername] = useState<string>("")

    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    },[])

    function getUsername() {

        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(data => {
                setUsername(data)
            })
    }

    useEffect(() => {
        if(username !== undefined){
            getUserPlans()
                .catch(error => console.error(error))
        }
        //eslint-disable-next-line
    },[username])

    const navigate = useNavigate()

    function getUserPlans(){
        return axios.get("/api/users/" + username + "/plans")
            .then(response => response.data)
            .then(setUserPlans)
    }

    const handleOnClick = (value: string) =>{

        const week= userPlans?.find(weekItem => {
            if(weekItem.weekId === value){
                return weekItem
            }else{
                return {weekId: weekItem.weekId, dailyPlans: []}
            }
        })!
        props.weekId(value)
        props.dailyPlans(week.dailyPlans)
        navigate("/weekoverview")
    }

    const mappedUserPlans = userPlans?.map(week => {
        return(
            <button value = {week.weekId} onClick={() => handleOnClick(week.weekId)} key={week.weekId}>{week.weekId}</button>
        )
    })

    return(
        <section>
            {mappedUserPlans}
        </section>
    )
}