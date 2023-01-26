import {useEffect, useState} from "react";
import axios from "axios";
import {ExerciseDTO} from "../model/ExerciseDTO";

export default function useExerciseApiCalls(){

    const [exercisesList, setExercisesList] = useState<ExerciseDTO[]>([])


    useEffect(() => {
        getExercisesListFromDB()
    },[])

    function getExercisesListFromDB(){
        axios.get("/api/exercises")
            .then(response => setExercisesList(response.data))
    }

    function addNewExerciseToDB(newExercise: string){
        axios.post("/api/exercises/",
            newExercise,
            {headers: {'Content-type': 'text/text; charset=utf-8'}})
            .then(savedExercise => {
                setExercisesList(prevExerciseList => [...prevExerciseList, savedExercise.data])
            })
            .catch(console.error)
    }

    return {exercisesList, addNewExerciseToDB}
}