import {useNavigate} from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";
import SettingPageApiCalls from "../hooks/SettingPageApiCalls";
import {Box, Button, FormControlLabel, TextField, Typography} from "@mui/material";

type SettingPageProps ={
    username: string
}

export default function PersonalDataDisplaying(props: SettingPageProps) {

    const {userData, submitUsername} = SettingPageApiCalls({username: props.username})

    const navigate = useNavigate()
    const [newUsername, setNewUsername] = useState<string>(props.username)


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
            <Typography variant={"h5"}>Persönliche Angaben</Typography>
            <form onSubmit={handleSubmitUsername}>
                <FormControlLabel control={<TextField type={"text"} onChange={handleUsernameInputOnChange}
                                                      name={"newUsername"}
                                                      label={"Username"}
                                                      placeholder={props.username}
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