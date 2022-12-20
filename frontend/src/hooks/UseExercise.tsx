import {useEffect, useState} from "react";
import {Exercise} from "../model/Exercise";
import axios from "axios";


export default function UseExercise(){

    const [exercises, setExercises] = useState<Exercise[]>()

    useEffect(() => {
        getAllExercises()
    },[])

    function getAllExercises(){
        axios.get("/api/exercises/")
            .then(response => response.data)
            .then(setExercises)
    }
    return {exercises}
}