import {Exercise} from "../model/Exercise";
import {ChangeEvent} from "react";
import "../css/UserExerciseDetails.css"


type ExerciseDetailsProps = {
    exercise: Exercise
    inputEntry: (event: ChangeEvent<HTMLInputElement>, entry: Exercise) => void
    disabled: boolean
}
export default function UserExerciseDetails(props: ExerciseDetailsProps) {


    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>){
        props.inputEntry(event,props.exercise)
    }

    return (
        <div>
            <label>{props.exercise.description}</label>
            <input type="number" name={"repeats"} value={props.exercise.repeats} onChange={handleInputOnChange}
                   disabled={props.disabled}/>
            <input type="number" name={"sets"} value={props.exercise.sets} onChange={handleInputOnChange}
                   disabled={props.disabled}/>
            <input type="number" name={"weight"} value={props.exercise.weight} onChange={handleInputOnChange}
                   disabled={props.disabled}/> kg
            <br/>
        </div>
    )
}