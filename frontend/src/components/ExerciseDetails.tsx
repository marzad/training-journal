import {ChangeEvent} from "react";
import {ExerciseDTO} from "../model/ExerciseDTO";

type ExerciseDetailsProps = {
    exercise : ExerciseDTO
    selectedExercisesForUser : (id: string, checked: boolean) => void
}

export default function ExerciseDetails(props: ExerciseDetailsProps){

    function checkBoxOnChange(event: ChangeEvent<HTMLInputElement>){
        if(event.target.checked){
            props.selectedExercisesForUser(props.exercise.id, true)
        }
        else{
            props.selectedExercisesForUser(props.exercise.id, false)
        }
    }

    return(
        <>
            <input type={"checkbox"} onChange={checkBoxOnChange} key={props.exercise.id}/>
            <label>{props.exercise.description}</label>
            <br/>
        </>
    )
}