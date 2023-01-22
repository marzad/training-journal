import {useNavigate} from "react-router-dom";
import "../css/HeadPage.css"
import React  from "react";

export default function HeadPage(){

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
        navigate("/logout")
    }

    return(
        <section className={"Buttons"}>
            <div>
                <button onClick={handleWeekPlanNavigation}>Wochenplan erstellen</button><br/>
                <button onClick={handlePersonalDataNavigation}>Gewicht eintragen</button><br/>
                <button onClick={handleCalendarNavigation}>Übersicht</button><br/>
                <button onClick={handleSettings}>Einstellungen</button><br/>
                <button onClick={handleLogout}>Ausloggen</button>

                {/*<button onClick={handleExercisesNavigation}>Übungen markieren</button><br/>*/}

            </div>
        </section>
    )
}