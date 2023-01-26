import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Exercise} from "../model/Exercise";
import {Day} from "../model/Day";

export default function useDailyExercisesApiCalls(){

    const [username, setUsername] = useState()
    const [userExercisesList, setUserExercisesList] = useState<Exercise[]>([])


    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        if (username !== undefined) {
            getUserExercisesList()
                .catch(error => console.error(error))
        }
        //eslint-disable-next-line
    }, [username])


    function getUsername() {

        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(data => {
                setUsername(data)
            })
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
        axios.post("/api/users/" + username + "/dailyplan",
            newPlan)
            .then(() => navigate("/weekdays"))
            .catch(error => console.error(error))
    }

    function onChangeExerciseDetails(updatedExerciseEntry: Exercise) {

        setUserExercisesList(prevState => prevState.map(existingItem => {
            if (existingItem.id === updatedExerciseEntry.id) {
                return updatedExerciseEntry
            } else {
                return existingItem
            }
        }))
    }

    return {userExercisesList, saveUserDailyPlan, onChangeExerciseDetails}
}