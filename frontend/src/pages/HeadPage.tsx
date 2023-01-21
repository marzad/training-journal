import {useNavigate} from "react-router-dom";
import "../css/HeadPage.css"
import React, {useEffect, useState} from "react";
import axios from "axios";


export default function HeadPage(){

    const [username, setUsername] = useState()

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUsername)
            .catch(error => console.error(error))
    }, [])

    const navigate = useNavigate()

    function handlePersonalDataNavigation(){
        navigate("/user")
    }

    function handleExercisesNavigation(){
        navigate("/exercises")
    }

    function handleWeekPlanNavigation(){
        navigate("/weekdays")
    }

    function handleCalendarNavigation(){
        navigate("/plansoverview")
    }

    return(
        <section className={"Buttons"}>
            <h2>von {username}</h2>
            <div>
                <button onClick={handlePersonalDataNavigation}>Persönliche Angaben</button><br/>
                <button onClick={handleExercisesNavigation}>Übungen</button><br/>
                <button onClick={handleWeekPlanNavigation}>Wochenplan</button><br/>
                <button onClick={handleCalendarNavigation}>Kalender</button>
            </div>
        </section>
    )
}