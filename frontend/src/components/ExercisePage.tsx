import {Exercise} from "../model/Exercise";
import ExerciseDetails from "./ExerciseDetails";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";


type exercisePageProps = {
    exercises? : Exercise[]
    selectedExercises: (exercisesList: Exercise[]) => void
}

export default function ExercisePage(props: exercisePageProps){
    const [newExercise, setNewExercise] = useState<string>("")
    const [exercisesList, setExercisesList] = useState<Exercise[]>([])

    const [selectedExercises, setSelectedExercises] = useState<Exercise[]>()

    useEffect(() => {
        axios.get("/api/exercises")
            .then(response => response.data)
            .then(setExercisesList)

    },[])

    const navigate = useNavigate()


    function inputNewExercise(event: ChangeEvent<HTMLInputElement>){
        setNewExercise(event.target.value)
    }

    function onClickNewExercise(){
        axios.post("/api/exercises/", newExercise)
            .catch(console.error)
        setNewExercise("")
    }

     function setSelectedExercisesList(id: string){

        if(exercisesList !== undefined){
            const exercise = exercisesList.find(entity => entity.id.includes(id))
        }


         // setSelectedExercises(prevState => [...prevState, exercise])
     }



    function getExerciseList(){
        if(exercisesList){
            return exercisesList.map(entity => {
                return <ExerciseDetails key={entity.id} exercise={entity} selected={setSelectedExercisesList}/>
            })
        }
    }

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(selectedExercises !== undefined){
            props.selectedExercises(selectedExercises)
        }
        navigate("/menu")
    }

    return(
        <>
            <form onSubmit={onSubmit}>
            {getExerciseList()}
            <input type={"text"} name={"newExercise"} value={newExercise} onChange={inputNewExercise}/>
            <button onClick={onClickNewExercise}>Neue Übung zufügen</button><br/>
                <button type={"submit"}>Speichern</button>
            </form>
        </>
    )
}