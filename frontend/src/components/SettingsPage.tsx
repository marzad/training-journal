import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import SettingPageApiCalls from "../hooks/SettingPageApiCalls";
import {Box, Button, FormControlLabel, TextField} from "@mui/material";

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

    function linkToUserWeightOverview() {
        navigate("/user")
    }

    return (
        <Box component={"section"}>
            <form onSubmit={handleSubmitUsername}>
                <FormControlLabel control={<TextField type={"text"} onChange={handleUsernameInputOnChange}
                                                      name={"newUsername"}
                                                      label={"Username"}
                                                      placeholder={currentUsername}
                                                      size={"small"}
                                                      helperText={"Neuer Username"}/>}
                                  label={"Username"}
                                  labelPlacement={"start"}
                />

                <Button type={"submit"}> Ändern</Button>
                <br/>
                <div>
                    <label>Geschlecht: </label>{userData.gender === "FEMALE" ? "Frau" : "Mann"}<br/>
                    <label>Geburtstag: </label>{userData.birthday.toString()}<br/>
                    <label>Größe: </label>{userData.userHeight}<br/>
                    <Button onClick={linkToUserWeightOverview}>Gewicht</Button><br/>
                    <label>Registriert am </label>{userData.registerData.toString()}<br/>
                </div>
                (Passwort ändern)
            </form>
            <Button onClick={handleUpdateExercisesOnClick}>Allgemeine Liste der Übungen bearbeiten</Button>
            <br/>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
            <br/>
        </Box>
    )
}