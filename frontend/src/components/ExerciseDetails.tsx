import {Exercise} from "../model/Exercise";
import {ChangeEvent} from "react";

type ExerciseDetailsProps = {
    exercise : Exercise
    selected : (id: string) => void
}
export default function ExerciseDetails(props: ExerciseDetailsProps){

    function checkBoxOnChange(event: ChangeEvent<HTMLInputElement>){
        if(event.target.checked){
            console.log(event.target.value)
            props.selected(event.target.value)
        }
    }


    return(
        <>
            <label>{props.exercise.description}</label>
            <input type={"checkbox"} onChange={checkBoxOnChange} key={props.exercise.id} value={props.exercise.id}/>
            <br/>
        </>
    )
}