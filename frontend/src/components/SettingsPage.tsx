import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {Week} from "../model/Week";

export default function SettingsPage() {

    const navigate = useNavigate()
    const [currentUsername, setCurrentUsername] = useState<string>("")
    const [newUsername, setNewUsername] = useState<string>(currentUsername)

    type UserDataTyp = {
        id?: string
        username: string,
        gender: string,
        birthday: Date,
        userWeight?: Set<{ date: Date, weight: number }>,
        userHeight: number,
        weekPlanlist?: Week[],
        exercises?: Set<{ id: string, description: string, repeats: number, sets: number, weight: number }>
        registerData: Date,
        password?: string
    }

    const initUserData = {
        id: "",
        username: "",
        gender: "MALE",
        birthday: new Date(),
        userWeight: new Set<{ date: Date, weight: number }>(),
        userHeight: 0,
        weekPlanlist: [],
        exercises: new Set<{ id: string, description: string, repeats: number, sets: number, weight: number }>(),
        registerData: new Date(),
        password: ""
    }

    const [userData, setUserData] = useState<UserDataTyp>(initUserData)

    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    }, [])

    useEffect(() => {
        if(currentUsername !== undefined && currentUsername !== ""){
            getUserData()
        }
        //eslint-disable-next-line
    },[currentUsername])

    function getUsername() {
        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(setCurrentUsername)
    }

    function submitUsername() {
        axios.put("/api/users/" + currentUsername + "/updateusername/", newUsername,
            {headers: {"Content-type": "text/plain"}})
            .catch(error => console.error(error))
            .then(() => navigate("/login"))
    }

    function getUserData() {
        axios.get("/api/users/" + currentUsername)
            .then(response => response.data)
            .then(data => {
                setUserData(data)
            })
            .catch(error => console.error(error))
    }

    function handleUsernameInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setNewUsername(event.target.value)
    }

    function handleSubmitUsername(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        submitUsername()
    }

    function handleUpdateExercisesOnClick() {
        navigate("/exercises")
    }

    function handleReturnOnClick() {
        navigate("/menu")
    }

    return (
        <section key={0}>
            <form onSubmit={handleSubmitUsername}>
                <label>Username</label><input type={"text"} onChange={handleUsernameInputOnChange} name={"newUsername"}
                                              placeholder={currentUsername}/>
                <button type={"submit"}>Ändern</button>
                <br/>
                <>
                    <label>Geschlecht: </label>{userData.gender === "FEMALE"? "Frau" : "Mann"}<br/>
                    <label>Geburtstag: </label>{userData.birthday.toString()}<br/>
                    <label>Größe: </label>{userData.userHeight}<br/>
                    <label>Registriert am </label>{userData.registerData.toString()}<br/>
                </>
                (Passwort ändern)
            </form>
            <button onClick={handleUpdateExercisesOnClick}>Liste der Übungen bearbeiten</button>
            <br/>
            <button onClick={handleReturnOnClick}>zurück</button>
            <br/>
        </section>
    )
}