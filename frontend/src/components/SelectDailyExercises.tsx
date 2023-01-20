import {Weekdays} from "../model/Weekdays";
import {ChangeEvent, FormEvent, useState} from "react";
import {Exercise} from "../model/Exercise";
import UserExerciseDetails from "./UserExerciseDetails";
import DailyExercisesApiCalls from "../hooks/DailyExercisesApiCalls";

type SelectDailyExercisesProps = {
    day: Weekdays | undefined
    username: string | undefined
}

export default function SelectDailyExercises(props: SelectDailyExercisesProps) {

    const [trainingfree, setTrainingfree] = useState(false)
    const [notes, setNotes] = useState<string>("")

    const {userExercisesList, saveUserDailyPlan, onChangeExerciseDetails} = DailyExercisesApiCalls()

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>, updatedExercise: Exercise) {
        let eventName = event.target.name

        const newUpdatedExercise = {...updatedExercise, [eventName]: event.target.value}
       onChangeExerciseDetails(newUpdatedExercise)
    }

    const exercises = userExercisesList?.map(exerciseItem => {

        if(exerciseItem.description === "STRETCHING" || exerciseItem.description === "WARMUP"){
            return(
            <>
                <label>{exerciseItem.description}</label>
                <input type="number" name={"repeats"} value={exerciseItem.repeats}
                       onChange={(event) => handleInputOnChange(event, exerciseItem)}
                       id={exerciseItem.description} disabled={trainingfree} key={exerciseItem.id}/> min
                <br/>
            </>)
        }
        else{
            return(
            <UserExerciseDetails exercise={exerciseItem} inputEntry={handleInputOnChange}
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

    return (
        <section>
            <h3>{props.day}</h3>
            <form onSubmit={handleOnSubmit}>

                <label>Trainingsfrei</label>
                <input type={"checkbox"} onChange={handleOnChangeCheckbox}/><br/>
                <>
                    {exercises}
                </>
                <label>Notizen</label><input type={"text"} name="notes" value={notes}
                                             onChange={handleOnChangeNotesInputFields} maxLength={300}/>
                <button type={"submit"}>Speichern</button>

            </form>
        </section>
    )
}