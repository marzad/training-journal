import {useNavigate} from "react-router-dom";
import "../css/HeadPage.css"


export default function HeadPage(){
    const navigate = useNavigate()

    function handlePersonalDataNavigation(){
        navigate("/user")
    }

    function handleExercisesNavigation(){
        navigate("/exercises")
    }

    function handleWeekPlanNavigation(){
        navigate("/weekplan")
    }

    function handleCalendarNavigation(){
        navigate("/calendar")
    }

    return(
        <section className={"Buttons"}>
            <button onClick={handlePersonalDataNavigation}>Persönliche Angaben</button><br/>
            <button onClick={handleExercisesNavigation}>Übungen</button><br/>
            <button onClick={handleWeekPlanNavigation}>Wochenplan</button><br/>
            <button onClick={handleCalendarNavigation}>Kalender</button>
        </section>
    )
}