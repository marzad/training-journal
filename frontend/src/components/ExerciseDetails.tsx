import {Exercise} from "../model/Exercise";

type ExerciseDetailsProps = {
    exercise : Exercise
}
export default function ExerciseDetails(props: ExerciseDetailsProps){

    return(
        <>
            {props.exercise.description === "warmup" || props.exercise.description === "stretching"?
                <>
                    <label>{props.exercise.description}</label>
                    <input type="number" name={"repeats"} placeholder={"30"} value = {props.exercise.repeats} required/> min
                    <br/>
                </> :
                <>
                    <label>{props.exercise.description}</label>
                    <input type="number" name={"repeats"} placeholder={"10"} value = {props.exercise.repeats} required/>
                    <input type="number" name={"sets"} placeholder={"3"} value = {props.exercise.sets} required/>
                    <input type="number" name={"weight"} value = {props.exercise.weight} required/>
                    <br/>
                </>
            }
        </>
    )
}