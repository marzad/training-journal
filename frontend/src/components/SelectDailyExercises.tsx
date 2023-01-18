import {Weekdays} from "../model/Weekdays";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Exercise} from "../model/Exercise";
import {useNavigate} from "react-router-dom";
import {Day} from "../model/Day";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;



type SelectDailyExercisesProps = {
    day: Weekdays | undefined
    username: string | undefined
}
export default function SelectDailyExercises(props: SelectDailyExercisesProps) {

    const [userExercisesList, setUserExercisesList] = useState<Exercise[]>([])
    const [updatedUserExercisesList, setUpdatedNewUserExercisesList] = useState<Exercise[]>([])
    const [notes, setNotes] = useState<string>("")
    const [username, setUsername] = useState()


    type InputEntryType = {
        repeats: string,
        sets: string,
        weight: string
    }

    const InitInputEntry: InputEntryType = {
        repeats: "",
        sets: "",
        weight: ""
    }

    const [inputEntry, setInputEntry] = useState<InputEntryType>(InitInputEntry)
    const [checkboxInputEntry, setCheckboxInputEntry] = useState<InputEntryType>(InitInputEntry)
    const [warmupInputEntry, setWarmupInputEntry] = useState<InputEntryType>(InitInputEntry)
    const [stretchingInputEntry, setStretchingInputEntry] = useState<InputEntryType>(InitInputEntry)


    const navigate = useNavigate()

    const initDailyPlan: Day = {
        weekday: Weekdays.MONDAY,
        exercises: [],
        notes: ""
    }

    const [dailyPlanEntry, setDailyPlanEntry] = useState<Day>(initDailyPlan)
    useEffect(()=>{
        getUsername()
            .catch(error => console.error(error))
    },[])

    useEffect(()=>{
        if(username !== undefined){
            getUserExercisesList()
                .catch(error => console.error(error))
        }
    },[username])


    function getUsername(){

        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(data => {

                setUsername(data)

            })
            .catch(error => console.error(error))
    }

//    console.log(dailyPlanEntry)

// Seite aktualisieren : username = undefined

    function getUserExercisesList() {

        return axios.get("/api/users/" + username + "/exercises/")
            .then(response => response.data)
            .then(data => {
                setUserExercisesList(data)
//                setUpdatedNewUserExercisesList(data)
            })
    }

    function saveUserDailyPlan() {

        axios.post("/api/users/" + username + "/dailyplan",
            dailyPlanEntry)
            .catch(error => console.error(error))
//        navigate("/weekdays")
    }

    /*
        function onChangeExerciseDetails(entry: Exercise) {
            setUpdatedNewUserExercisesList(prevState => prevState.map(exercisesItem => {
                if (exercisesItem.id === entry.id) {
                    return entry
                } else {
                    return exercisesItem
                }
            }))

        }
    */

    /*    const exercises = userExercisesList?.map(exerciseItem => {
            return <UserExerciseDetails exercise={exerciseItem} key={exerciseItem.id} inputEntry={onChangeExerciseDetails}/>
        })    */

    function getUpdatedExercise(description: string): Exercise {
        return userExercisesList.find(exercise => {
            return exercise.description === description
        })!
    }

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {

        let eventName = event.target.name

        const exercise: Exercise = getUpdatedExercise(event.target.id)
        let newExercise: Exercise = {
            id: exercise.id,
            description: exercise.description,
            repeats: "",
            sets: "",
            weight: ""
        }

        if (event.target.id === "pause" && event.target.checked) {
            setCheckboxInputEntry({repeats: "1", sets: "", weight: ""})
            newExercise = {id: exercise.id, description: exercise.description, repeats: "1", sets: "", weight: ""}
        }

        if (event.target.id === "pause" && !event.target.checked) {
            setCheckboxInputEntry({repeats: "0", sets: "", weight: ""})
            newExercise = {id: exercise.id, description: exercise.description, repeats: "0", sets: "", weight: ""}
        }

        if (event.target.id === "warmup") {
            setWarmupInputEntry({repeats: event.target.value, sets: "", weight: ""})
            newExercise = {id: exercise.id, description: exercise.description, repeats: event.target.value, sets: "", weight: ""}
        }
        if (event.target.id === "stretching") {
            setStretchingInputEntry({repeats: event.target.value, sets: "", weight: ""})
            newExercise = {id: exercise.id, description: exercise.description, repeats: event.target.value, sets: "", weight: ""}
        }

        if (event.target.id !== "pause" && event.target.id !== "warmup" && event.target.id !== "stretching") {
            switch (eventName) {
                case "repeats" : {
                    setInputEntry(prevState => ({...prevState, repeats: event.target.value}))

                    break
                }
                case "sets" : {
                    setInputEntry(prevState => ({...prevState, sets: event.target.value}))

                    break
                }
                case "weight" : {
                    setInputEntry(prevState => ({...prevState, weight: event.target.value}))

                    break
                }
                default :
            }
            newExercise = {id: exercise.id, description: exercise.description, repeats: inputEntry.repeats, sets: inputEntry.sets, weight: inputEntry.weight}
        }

        const newList = updatedUserExercisesList.filter(item => {
            if(item.id === exercise.id || item.repeats !== "0"){
                return item
            }
        })

        console.log("newExercise",newExercise)
        newList.push(newExercise)
        console.log(newList)
        setUpdatedNewUserExercisesList(newList)

//        console.log("3",updatedUserExercisesList)
    }

    const exercises = userExercisesList?.map(exerciseItem => {
        const handleExercise = () => {
            const exerciseName = exerciseItem.description
            switch (exerciseName) {
                case "pause" :
                    return 1
                case "warmup" :
                    return 2
                case "stretching" :
                    return 22
                default :
                    return 3
            }
        }


        return (<div key={exerciseItem.id}>
            {handleExercise() === 1 ?
                <>
                    <label>{exerciseItem.description}</label>
                    <input type="checkbox" name={"repeats"} value={checkboxInputEntry.repeats}
                           onChange={handleInputOnChange}
                           id={exerciseItem.description} />
                    <br/>
                </> : <></>}
            {handleExercise() === 2 ?
                <>
                    <label>{exerciseItem.description}</label>
                    <input type="number" name={"repeats"} value={warmupInputEntry.repeats}
                           onChange={handleInputOnChange}
                           id={exerciseItem.description}/> min
                    <br/>
                </> : <></>}
            {handleExercise() === 22 ?
                <>
                    <label>{exerciseItem.description}</label>
                    <input type="number" name={"repeats"} value={stretchingInputEntry.repeats}
                           onChange={handleInputOnChange}
                           id={exerciseItem.description}/> min
                    <br/>
                </> : <></>}
            {handleExercise() === 3 ?
                <>
                    <label>{exerciseItem.description}</label>
                    <input type="number" name={"repeats"} value={inputEntry.repeats} onChange={handleInputOnChange}
                           id={exerciseItem.description}/>
                    <input type="number" name={"sets"} value={inputEntry.sets} onChange={handleInputOnChange}
                           id={exerciseItem.description}/>
                    <input type="number" name={"weight"} value={inputEntry.weight} onChange={handleInputOnChange}
                           id={exerciseItem.description}/> kg
                    <br/>
                </> : <></>
            }
        </div>)
    })

    function handleOnChange(event: ChangeEvent<HTMLInputElement>) {
        setNotes(event.target.value)
    }

    function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        console.log(updatedUserExercisesList)
        setDailyPlanEntry({
            weekday: props.day!,
            exercises: updatedUserExercisesList,
            notes: notes
        })

//        console.log(dailyPlanEntry)
//        saveUserDailyPlan()
    }


    return (
        <section>
            <form onSubmit={handleOnSubmit}>
                {exercises}
                <label>Notizen</label><input type={"text"} name="notes" value={notes} onChange={handleOnChange} maxLength={300}/>
                <button type={"submit"}>Speichern</button>
            </form>

        </section>
    )
}