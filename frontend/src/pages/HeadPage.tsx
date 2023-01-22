import {useNavigate} from "react-router-dom";
import "../css/HeadPage.css"
import React  from "react";

export default function HeadPage(){

/*
    const [username, setUsername] = useState()

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUsername)
            .catch(error => console.error(error))
    }, [])
*/

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
            <div>
                <button onClick={handlePersonalDataNavigation}>Persönliche Angaben ändern</button><br/>
                <button onClick={handleExercisesNavigation}>Übungen markieren</button><br/>
                <button onClick={handleWeekPlanNavigation}>Wochenplan erstellen</button><br/>
                <button onClick={handleCalendarNavigation}>Übersicht</button>
            </div>
        </section>
    )
}