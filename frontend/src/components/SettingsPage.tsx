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

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setNewUsername(event.target.value)
    }

    function handleFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        submitUsername()
    }

    function submitUsername(){
        axios.put("/api/users/" + currentUsername + "/updateusername/", newUsername,
            {headers: {"Content-type": "text/plain"}})
            .catch(error => console.error(error))
            .then(() => navigate("/login"))
    }

    function handleOnClick(){
        navigate("/exercises")
    }

    function handleOnClickReturn(){
        navigate("/menu")
    }

    return(
        <section>
            <form onSubmit={handleFormOnChange}>
                <label>Username</label><input type={"text"} onChange={handleInputOnChange} name={"newUsername"}
                                              placeholder={currentUsername}/>
                <button type={"submit"}>Ändern</button><br/>
                (Passwort ändern)
            </form>

            <button onClick={handleOnClick}>Liste der Übungen bearbeiten</button><br/>
            <button onClick={handleOnClickReturn}>zurück</button><br/>
        </section>
    )
}