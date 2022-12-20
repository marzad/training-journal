import {Exercise} from "../model/Exercise";
import ExerciseDetails from "./ExerciseDetails";
import {ChangeEvent, useEffect, useState} from "react";
import axios from "axios";


type exercisePageProps = {
    exercises? : Exercise[]
}

export default function ExercisePage(props: exercisePageProps){
    const [newExercise, setNewExercise] = useState<string>("")
    const [exercisesList, setExercisesList] = useState<Exercise[]>()



    useEffect(() => {
        axios.get("/api/exercises")
            .then(response => response.data)
            .then(setExercisesList)

    },[])


    function inputNewExercise(event: ChangeEvent<HTMLInputElement>){
        setNewExercise(event.target.value)
    }

    function onClickNewExercise(){
        axios.post("/api/exercises/", newExercise)
            .catch(console.error)
        setNewExercise("")
    }

    function getExerciseList(){
        if(exercisesList){
            return exercisesList.map(entity => {
                return <ExerciseDetails key={entity.id} exercise={entity}/>
            })
        }
    }
    return(
        <>
            {getExerciseList()}
            <input type={"text"} name={"newExercise"} value={newExercise} onChange={inputNewExercise}/>
            <button onClick={onClickNewExercise}>Neue Übung zufügen</button>
            <br/>
        </>
    )
}