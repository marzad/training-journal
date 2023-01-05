import {useEffect, useState} from "react";
import {Exercise} from "../model/Exercise";
import axios from "axios";

export default function ExerciseApiCalls(){

    const [exercisesList, setExercisesList] = useState<Exercise[]>([])


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