import {ChangeEvent} from "react";
import {ExerciseDTO} from "../model/ExerciseDTO";
import {Checkbox, FormControlLabel} from "@mui/material";

type ExerciseDetailsProps = {
    exercise: ExerciseDTO
    selectedExercisesForUser: (id: string, checked: boolean) => void
}

export default function ExerciseDetails(props: ExerciseDetailsProps) {

    function checkBoxOnChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            props.selectedExercisesForUser(props.exercise.id, true)
        } else {
            props.selectedExercisesForUser(props.exercise.id, false)
        }
    }


    return (
        <FormControlLabel control={<Checkbox
            onChange={checkBoxOnChange}
            inputProps={{'aria-label': 'controlled'}}></Checkbox>}
                          label={props.exercise.description}/>
    )
}