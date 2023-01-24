import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";

export default function SettingsPage(){

    const navigate = useNavigate()
    const [currentUsername, setCurrentUsername] = useState<string>("")
    const [newUsername, setNewUsername] = useState<string>(currentUsername)

    useEffect(() => {
        getUsername()
            .catch(error => console.error(error))
    }, [])

    function getUsername() {
        return axios.get("/api/users/me")
            .then(response => response.data)
            .then(setCurrentUsername)
    }

    function handleUsernameInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setNewUsername(event.target.value)
    }

    function handleSubmitUsername(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        submitUsername()
    }

    function submitUsername(){
        axios.put("/api/users/" + currentUsername + "/updateusername/", newUsername,
            {headers: {"Content-type": "text/plain"}})
            .catch(error => console.error(error))
            .then(() => navigate("/login"))
    }

    function handleUpdateExercisesOnClick(){
        navigate("/exercises")
    }

    function handleReturnOnClick(){
        navigate("/menu")
    }

    return(
        <section>
            <form onSubmit={handleSubmitUsername}>
                <label>Username</label><input type={"text"} onChange={handleUsernameInputOnChange} name={"newUsername"}
                                              placeholder={currentUsername}/>
                <button type={"submit"}>Ändern</button><br/>
                (Passwort ändern)
            </form>

            <button onClick={handleUpdateExercisesOnClick}>Liste der Übungen bearbeiten</button><br/>
            <button onClick={handleReturnOnClick}>zurück</button><br/>
        </section>
    )
}