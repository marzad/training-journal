import {useNavigate} from "react-router-dom";
import {Weekdays} from "../model/Weekdays";
import {Box, Button, Typography} from "@mui/material";

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

    const handleReturnOnClick = () => {
        navigation("/menu")
    }

    const handleSelectExercises = () => {
        navigation("/exercises")
    }

    return(
        <Box component={"section"}>
            <Typography variant={"h5"}>Wochenplan erstellen</Typography>
            <Button value={"MONDAY"} onClick={handleOnClickMonday}>Montag</Button><br/>
            <Button value={"TUESDAY"} onClick={handleOnClickTuesday}>Dienstag</Button><br/>
            <Button value={"WEDNESDAY"} onClick={handleOnClickWednesday}>Mittwoch</Button><br/>
            <Button value={"THURSDAY"} onClick={handleOnClickThursday}>Donnerstag</Button><br/>
            <Button value={"FRIDAY"} onClick={handleOnClickFriday}>Freitag</Button><br/>
            <Button value={"SATURDAY"} onClick={handleOnClickSaturday}>Samstag</Button><br/>
            <Button value={"SUNDAY"} onClick={handleOnClickSunday}>Sonntag</Button><br/>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleSelectExercises}
                    color={"success"}
                    style={{margin: 5}}
            >Übungen für einen Tagesplan auswählen</Button>
            <br/>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
        </Box>
    )
}