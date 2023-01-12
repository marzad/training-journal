import {useNavigate} from "react-router-dom";
import "../css/HeadPage.css"
import React from "react";

type HeadPageProps ={
    username : string | undefined
}


export default function HeadPage(props: HeadPageProps){

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
        navigate("/calendar")
    }

    return(
        <section className={"Buttons"}>
            <h2>Hallo {props.username}!</h2>
            <div>
                <button onClick={handlePersonalDataNavigation}>Persönliche Angaben</button><br/>
                <button onClick={handleExercisesNavigation}>Übungen</button><br/>
                <button onClick={handleWeekPlanNavigation}>Wochenplan</button><br/>
                <button onClick={handleCalendarNavigation}>Kalender</button>
            </div>
        </section>
    )
}