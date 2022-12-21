import {useNavigate} from "react-router-dom";


export default function HeadPage(){
    const navigate = useNavigate()

    function personalDataOnClick(){
        navigate("/user")
    }

    function exercisesOnClick(){
        navigate("/exercises")
    }

    function weekPlanOnClick(){
        navigate("/weekplan")
    }

    function calendarOnClick(){
        navigate("/calendar")
    }

    return(
        <div className={"Menu"}>
            <button onClick={personalDataOnClick}>Persönliche Angaben</button><br/>
            <button onClick={exercisesOnClick}>Übungen</button><br/>
            <button onClick={weekPlanOnClick}>Wochenplan</button><br/>
            <button onClick={calendarOnClick}>Kalender</button>
        </div>
    )
}