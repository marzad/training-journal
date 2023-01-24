import {useNavigate} from "react-router-dom";
import "../css/MainPage.css"
import React  from "react";
import axios from "axios/index";

export default function MainPage(){

    const navigate = useNavigate()

    function handlePersonalDataNavigation(){
        navigate("/user")
    }

    function handleWeekPlanNavigation(){
        navigate("/weekdays")
    }

    function handleCalendarNavigation(){
        navigate("/plansoverview")
    }

    function handleSettings(){
        navigate("/settings")
    }

    function handleLogout(){
        return axios.post("/api/users/logout")
            .then(() => navigate("/login"))
            .catch(error => console.error(error))
    }

    return(
        <section className={"Buttons"}>
            <div>
                <button onClick={handleWeekPlanNavigation}>Wochenplan erstellen</button><br/>
                <button onClick={handlePersonalDataNavigation}>Gewicht eintragen</button><br/>
                <button onClick={handleCalendarNavigation}>Archiv</button><br/>
                <button onClick={handleSettings}>Einstellungen</button><br/>
                <button onClick={handleLogout}>Ausloggen</button>

                {/*<button onClick={handleExercisesNavigation}>Übungen markieren</button><br/>*/}

            </div>
        </section>
    )
}