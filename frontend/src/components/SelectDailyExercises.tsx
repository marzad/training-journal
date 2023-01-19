import {Weekdays} from "../model/Weekdays";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Exercise} from "../model/Exercise";
import {useNavigate} from "react-router-dom";
import {Day} from "../model/Day";
import UserExerciseDetails from "./UserExerciseDetails";

type SelectDailyExercisesProps = {
    day: Weekdays | undefined
    username: string | undefined
}

export default function SelectDailyExercises(props: SelectDailyExercisesProps) {

    const [username, setUsername] = useState()
    const [userExercisesList, setUserExercisesList] = useState<Exercise[]>([])
    const [trainingfree, setTrainingfree] = useState(false)
    const [notes, setNotes] = useState<string>("")

    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        if (username !== undefined) {
            getUserExercisesList()
                .catch(error => console.error(error))
        }
    }, [username])


    function getUsername() {

        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(data => {
                setUsername(data)
            })
            .catch(error => console.error(error))
    }


    const navigate = useNavigate()

    function getUserExercisesList() {

        return axios.get("/api/users/" + username + "/exercises/")
            .then(response => response.data)
            .then(data => {
                setUserExercisesList(data)
            })
    }

    function saveUserDailyPlan(newPlan: Day) {

        console.log(newPlan)

        axios.post("/api/users/" + username + "/dailyplan",
            newPlan)
            .catch(error => console.error(error))
//        navigate("/weekdays")
    }


    function handleStretchingWarmupInputOnChange(event: ChangeEvent<HTMLInputElement>){

        const exercise: Exercise = findExerciseToUpdate(event.target.id)

        const newExercise = {
            id: exercise.id,
            description: exercise.description,
            repeats: event.target.value,
            sets: "",
            weight: ""
        }
        onChangeExerciseDetails(newExercise)
    }

    function onChangeExerciseDetails(entry: Exercise) {
        if (userExercisesList.find(item => item.id === entry.id)) {
            setUserExercisesList(prevState => prevState.map(exercisesItem => {
                if (exercisesItem.id === entry.id) {
                    return entry
                } else {
                    return exercisesItem
                }
            }))
        } else {
            setUserExercisesList(prevState => [...prevState, entry])
        }
    }

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>, updatedExercise: Exercise) {
        let eventName = event.target.name

        const newUpdatedExercise = {...updatedExercise, [eventName]: event.target.value}
       onChangeExerciseDetails(newUpdatedExercise)
    }


    function findExerciseToUpdate(description: string): Exercise {
        return userExercisesList.find(exercise => {
            return exercise.description === description
        })!
    }

    const exercises = userExercisesList?.map(exerciseItem => {

        if(exerciseItem.description === "STRETCHING" || exerciseItem.description === "WARMUP"){
            return(
            <>
                <label>{exerciseItem.description}</label>
                <input type="number" name={"repeats"} value={exerciseItem.repeats}
                       onChange={handleStretchingWarmupInputOnChange}
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
            setUserExercisesList([])
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