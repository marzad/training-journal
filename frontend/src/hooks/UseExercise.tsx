import {useEffect, useState} from "react";
import axios from "axios";
import {ExerciseDTO} from "../model/ExerciseDTO";


export default function useExercise(){

    const [exercises, setExercises] = useState<ExerciseDTO[]>()

    useEffect(() => {
        getAllExercises()
    },[])

    function getAllExercises(){
        axios.get("/api/exercises")
            .then(response => response.data)
            .then(setExercises)
    }
    return {exercises}
}