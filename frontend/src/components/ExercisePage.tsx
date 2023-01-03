import {Exercise} from "../model/Exercise";
import ExerciseDetails from "./ExerciseDetails";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import "../css/ExercisePage.css"


type exercisePageProps = {
    exercises? : Exercise[]
    selectedExercisesList: (exercisesList: Exercise[]) => void
}

export default function ExercisePage(props: exercisePageProps){
    const [newExercise, setNewExercise] = useState<string>("")
    const [exercisesList, setExercisesList] = useState<Exercise[]>([])

    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>([])

    useEffect(() => {
        getExercisesListFromDB()
    },[newExercise, onClickNewExercise])

    const navigate = useNavigate()

    function getExercisesListFromDB(){
        axios.get("/api/exercises")
            .then(response => response.data)
            .then(setExercisesList)
    }


    function inputNewExercise(event: ChangeEvent<HTMLInputElement>){
        setNewExercise(event.target.value)
    }

    function onClickNewExercise(){
        axios.post("/api/exercises/", newExercise)
            .catch(console.error)
        setNewExercise("")
        getExercisesListFromDB()
    }

     function setSelectedExercisesList(searchedId: string){
        let exercise: Exercise | undefined
        if(exercisesList !== undefined){
            exercise= exercisesList.filter(entity => {
                return entity.id.includes(searchedId)
            }).at(0)
        }

         //setSelectedExercises(prevState => [...prevState, exercise])
         let list = selectedExercises
         if (exercise) {
             list?.push(exercise)
             setSelectedExercises(list)
         }
     }

    function getExerciseList(){
            return exercisesList.map(entity => {
                return <ExerciseDetails key={entity.id} exercise={entity} selected={setSelectedExercisesList}/>
            })
    }

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(selectedExercises !== undefined){
            console.log(selectedExercises)
            props.selectedExercisesList(selectedExercises)
        }
        navigate("/menu")
    }

    return(
        <section className={"exercisesList"}>
            <form onSubmit={onSubmit}>
            {getExerciseList()}
            <input type={"text"} name={"newExercise"} value={newExercise} onChange={inputNewExercise}/>
            <button onClick={onClickNewExercise}>Neue Übung speichern</button><br/>
                <button type={"submit"}>Speichern</button>
            </form>
        </section>
    )
}