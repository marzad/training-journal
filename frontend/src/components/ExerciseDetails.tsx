import {Exercise} from "../model/Exercise";
import {ChangeEvent} from "react";

type ExerciseDetailsProps = {
    exercise : Exercise
    selected : (id: string) => void
}
export default function ExerciseDetails(props: ExerciseDetailsProps){

    function checkBoxOnChange(event: ChangeEvent<HTMLInputElement>){
        if(event.target.checked){
            props.selected(props.exercise.id)
        }
    }

    return(
        <>
            <label>{props.exercise.description}</label>
            <input type={"checkbox"} onChange={checkBoxOnChange} key={props.exercise.id}/>
            <br/>
        </>
    )
}