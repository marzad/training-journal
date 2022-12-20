import {Exercise} from "../model/Exercise";

type ExerciseDetailsProps = {
    exercise : Exercise
}
export default function ExerciseDetails(props: ExerciseDetailsProps){


    return(
        <>
            <div>
            {props.exercise.description === "warmup" || props.exercise.description === "stretching"?
                <>
                    <label>{props.exercise.description}</label>
                    <input type="number" name={"repeats"} value = {props.exercise.repeats} required/> min
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
            {props.exercise.description === "Pause" ?
            <>
                <label>{props.exercise.description}</label>
                <input type="checkbox" name={"Pause"} value = {props.exercise.repeats} required/>
                <br/>
            </> :
                <>
                </>
            }
            </div>
        </>
    )
}