import {useNavigate} from "react-router-dom";
import {Weekdays} from "../model/Weekdays";

type WeekDaysSelectProps ={
    selectedDay : (day: Weekdays) => void
}

export default function WeekDaysSelect(props: WeekDaysSelectProps){

    const navigation = useNavigate()

    const handleOnClickMonday = () =>{
        props.selectedDay(Weekdays.MONDAY)
       navigation("/selectexercises")
    }
    const handleOnClickTuesday = () =>{
        props.selectedDay(Weekdays.TUESDAY)
       navigation("/selectexercises")
    }
    const handleOnClickWednesday = () =>{
        props.selectedDay(Weekdays.WEDNESDAY)
       navigation("/selectexercises")
    }
    const handleOnClickThursday = () =>{
        props.selectedDay(Weekdays.THURSDAY)
       navigation("/selectexercises")
    }
    const handleOnClickFriday = () =>{
        props.selectedDay(Weekdays.FRIDAY)
       navigation("/selectexercises")
    }
    const handleOnClickSaturday = () =>{
        props.selectedDay(Weekdays.SATURDAY)
       navigation("/selectexercises")
    }
    const handleOnClickSunday = () =>{
        props.selectedDay(Weekdays.SUNDAY)
       navigation("/selectexercises")
    }

    const handleOnClickReturn = () => {
        navigation("/menu")
    }

    return(
        <section>
            <button value={"MONDAY"} onClick={handleOnClickMonday}>Montag</button><br/>
            <button value={"TUESDAY"} onClick={handleOnClickTuesday}>Dienstag</button><br/>
            <button value={"WEDNESDAY"} onClick={handleOnClickWednesday}>Mittwoch</button><br/>
            <button value={"THURSDAY"} onClick={handleOnClickThursday}>Donnerstag</button><br/>
            <button value={"FRIDAY"} onClick={handleOnClickFriday}>Freitag</button><br/>
            <button value={"SATURDAY"} onClick={handleOnClickSaturday}>Samstag</button><br/>
            <button value={"SUNDAY"} onClick={handleOnClickSunday}>Sonntag</button><br/>
            <button onClick={handleOnClickReturn}>zurück</button>
        </section>
    )
}