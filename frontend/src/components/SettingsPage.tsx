import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import SettingPageApiCalls from "../hooks/SettingPageApiCalls";

export default function SettingsPage() {

    const {currentUsername, userData, submitUsername} = SettingPageApiCalls()

    const navigate = useNavigate()
    const [newUsername, setNewUsername] = useState<string>(currentUsername)


    function handleUsernameInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setNewUsername(event.target.value)
    }

    function handleSubmitUsername(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        submitUsername(newUsername)
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