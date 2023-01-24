import {useNavigate} from "react-router-dom";
import "../css/MainPage.css"
import React  from "react";
import UserApiCall from "../hooks/UserApiCall";

export default function MainPage(){

    const navigate = useNavigate()
    const {logout} = UserApiCall()

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

    return(
        <section className={"Buttons"}>
            <div>
                <button onClick={handleWeekPlanNavigation}>Wochenplan erstellen</button><br/>
                <button onClick={handlePersonalDataNavigation}>Gewicht eintragen</button><br/>
                <button onClick={handleCalendarNavigation}>Archiv</button><br/>
                <button onClick={handleSettings}>Einstellungen</button><br/>
                <button onClick={logout}>Ausloggen</button>
            </div>
        </section>
    )
}