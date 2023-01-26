import {Weekdays} from "../model/Weekdays";
import {ChangeEvent, FormEvent, useState} from "react";
import {Exercise} from "../model/Exercise";
import UserExerciseDetails from "./UserExerciseDetails";
import DailyExercisesApiCalls from "../hooks/DailyExercisesApiCalls";
import {useNavigate} from "react-router-dom";
import {Box, Button, FormControlLabel, Switch, TextField, Typography} from "@mui/material";


type SelectDailyExercisesProps = {
    day: Weekdays | undefined
    username: string | undefined
}

export default function SelectDailyExercises(props: SelectDailyExercisesProps) {

    const [trainingfree, setTrainingfree] = useState(false)
    const [notes, setNotes] = useState<string>("")

    const {userExercisesList, saveUserDailyPlan, onChangeExerciseDetails} = DailyExercisesApiCalls()

    const navigate = useNavigate()

    function handleExercisesSettingInputOnChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, updatedExercise: Exercise) {
        let eventName = event.target.name

        const newUpdatedExercise = {...updatedExercise, [eventName]: event.target.value}
        onChangeExerciseDetails(newUpdatedExercise)
    }

    const exercises = userExercisesList?.map(exerciseItem => {

        if (exerciseItem.description === "STRETCHING" || exerciseItem.description === "WARMUP") {
            return (
                <div key={exerciseItem.id}>
                    <FormControlLabel control={<TextField type="number" name={"repeats"} value={exerciseItem.repeats}
                                                          onChange={(event) => handleExercisesSettingInputOnChange(event, exerciseItem)}
                                                          id={exerciseItem.description}
                                                          disabled={trainingfree}
                                                          size={"small"}
                                                          label={"Zeit"}
                                                          color={"success"}/>}
                                      label={exerciseItem.description}
                                      labelPlacement={"start"}
                                      style={{width: 200}}/> &nbsp; min
                    <br/>
                </div>)
        } else {
            return (
                <UserExerciseDetails exercise={exerciseItem} inputEntry={handleExercisesSettingInputOnChange}
                                     disabled={trainingfree} key={exerciseItem.id}/>)
        }
    })

    function handleOnChangeNotesInputFields(event: ChangeEvent<HTMLInputElement>) {
        setNotes(event.target.value)
    }

    function handleOnChangeCheckbox(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setTrainingfree(true)
        } else {
            setTrainingfree(false)
        }
    }

    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const dailyPlanEntry = {
            weekday: props.day!,
            exercises: userExercisesList,
            notes: notes,
            trainingfree: trainingfree
        }
        saveUserDailyPlan(dailyPlanEntry)
    }

    function handleReturnOnClick() {
        navigate(-1)
    }

    function selectExercises() {
        navigate("/exercises")
    }

    const weekDay = () => {
        switch (props.day) {
            case "MONDAY" :
                return "Montag"
            case "TUESDAY" :
                return "Dienstag"
            case "THURSDAY" :
                return "Donnerstag"
            case "WEDNESDAY" :
                return "Mittwoch"
            case "FRIDAY" :
                return "Freitag"
            case "SATURDAY" :
                return "Samstag"
            case "SUNDAY" :
                return "Sonntag"
            default :
                return ""
        }
    }

    return (
        <Box component={"section"} sx={{
            display: "flex",
            flexDirection: "column",
            margin: 5
        }}>
            <Typography variant={"h5"}>Erstellen des Trainingsplans</Typography>
            <Typography variant={"h6"}> für {weekDay()}</Typography>
            <form onSubmit={handleOnSubmit}>
                <FormControlLabel
                    control={<Switch
                        checked={trainingfree}
                        onChange={handleOnChangeCheckbox}
                        sx = {{color: "success.main", width: 70}}
                        color={"success"}/>}
                    label={"Trainingsfrei"}
                    labelPlacement={"start"}
                    />
                <br/>
                <>
                    {userExercisesList ? exercises : selectExercises()}
                </>
                <FormControlLabel control={<TextField type={"text"}
                                                      name="notes"
                                                      value={notes}
                                                      onChange={handleOnChangeNotesInputFields}
                                                      label={"Notizen"}
                                                      fullWidth
                                                      multiline={true}
                                                      color={"success"}
                />}
                                  label={"Notizen"}
                                  labelPlacement={"start"}
                />
                <br/>
                <Button type={"submit"}
                        variant={"contained"}
                        color={"success"}
                >Trainingsplan speichern</Button>
                <br/>
                <Button variant={"outlined"}
                        size={"small"}
                        onClick={handleReturnOnClick}
                        color={"success"}
                        style={{margin: 5}}
                >zurück</Button>

            </form>

        </Box>
    )
}