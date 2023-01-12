import {Weekdays} from "../model/Weekdays";
import {useEffect, useState} from "react";
import axios from "axios";
import {Exercise} from "../model/Exercise";
import UserExerciseDetails from "./UserExerciseDetails";


type SelectDailyExercisesProps ={
    day : Weekdays | undefined
}
export default function SelectDailyExercises(props: SelectDailyExercisesProps){
    
    const [userExercisesList, setUserExercisesList] = useState<Exercise[]>()
    const [username, setUsername] = useState()
    
    useEffect(() =>{
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUsername)
            .then(getUserExercisesList)
        //eslint-disable-next-line
    },[])

    function getUserExercisesList(){
        axios.get("/api/users/" + username + "/exercises/")
            .then(response => response.data)
            .then(data => setUserExercisesList(data))
            .catch(error => console.error(error))
    }
    
    const exercises = userExercisesList?.map(exerciseItem => {
        return <UserExerciseDetails exercise={exerciseItem} key={exerciseItem.id}/>
    })
    
    return(
        <section>
            {exercises}
        </section>
    )
}