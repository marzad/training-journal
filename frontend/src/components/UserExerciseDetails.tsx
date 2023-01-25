import {Exercise} from "../model/Exercise";
import {ChangeEvent} from "react";
import {FormControlLabel, TextField} from "@mui/material";


type ExerciseDetailsProps = {
    exercise: Exercise
    inputEntry: (event: ChangeEvent<HTMLTextAreaElement>, entry: Exercise) => void
    disabled: boolean
}
export default function UserExerciseDetails(props: ExerciseDetailsProps) {


    function handleInputOnChange(event: ChangeEvent<HTMLTextAreaElement>) {
        props.inputEntry(event, props.exercise)
    }

    return (
        <div>
            <FormControlLabel control={<TextField type="number"
                                                  name={"repeats"}
                                                  value={props.exercise.repeats}
                                                  onChange={handleInputOnChange}
                                                  disabled={props.disabled}
                                                  label={"Wiederholungen"}
                                                  size={"small"}
                                                  style={{width: 150}}
                                                  color={"success"}/>}
                              label={props.exercise.description}
                              labelPlacement={"start"}/>
            <FormControlLabel control={<TextField type="number"
                                                  name={"sets"}
                                                  value={props.exercise.sets}
                                                  onChange={handleInputOnChange}
                                                  disabled={props.disabled}
                                                  label={"Sets"}
                                                  size={"small"}
                                                  style={{width: 100}}
                                                  color={"success"}/>}
                              label={"/"}
                              labelPlacement={"start"}/>
            <FormControlLabel control={<TextField type="number"
                                                  name={"weight"}
                                                  value={props.exercise.weight}
                                                  onChange={handleInputOnChange}
                                                  disabled={props.disabled}
                                                  label={"Gewicht"}
                                                  size={"small"}
                                                  style={{width: 100}}
                                                  color={"success"}/>}
                              label={"/"}
                              labelPlacement={"start"}/>&nbsp; kg
            <br/>
        </div>
    )
}