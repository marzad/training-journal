import {Gender} from "../model/Gender";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField
} from "@mui/material";


export default function SignUp() {

    type SignupDataForm = {
        username: string,
        gender: Gender,
        birthday: string,
        userWeight: number,
        userHeight: number,
        password: string
    }
    const initSignupData: SignupDataForm = {
        username: "",
        gender: Gender.FEMALE,
        birthday: "",
        userWeight: 0.0,
        userHeight: 0.0,
        password: ""
    }

    const [formInput, setFormInput] = useState<SignupDataForm>(initSignupData)

    const navigate = useNavigate()

    function handleFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        axios.post("/api/users/",
            formInput)
            .then(response => response.data)
            .catch(error => console.log(error))
            .then(() => login(formInput.username, formInput.password))
    }

    function login(username: string, password: string) {
        return axios.post("/api/users/login",
            undefined,
            {
                auth: {
                    username,
                    password
                }
            })
            .then(response => {
                return response.data
            })
            .catch(error => console.error(error))
            .then(() => navigate("/menu"))
    }

    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {

        let eventName = event.target.name
        let eventValue = event.target.value

        setFormInput(prevState => ({...prevState, [eventName]: eventValue}))
    }

    function handleSelectOnChange(event: SelectChangeEvent) {

        setFormInput(prevState => ({...prevState, [event.target.name]: event.target.value}))

    }

    return (
        <Box component={"section"}>
            <form onSubmit={handleFormOnChange}>
                <FormControlLabel control={<TextField type={"text"}
                                                      name={"username"}
                                                      onChange={handleInputOnChange}
                                                      label={"Username"}
                                                      size={"small"}/>}
                                  label={"Username"}
                                  labelPlacement={"start"}/>
                <br/>
                <FormControlLabel control={<FormControl sx={{width: 100}}>
                    <InputLabel id="select-label">Geschlecht</InputLabel>
                    <Select
                        labelId="select-label"
                        id="select"
                        label="Age"
                        size={"small"}
                        onChange={handleSelectOnChange}
                    >
                        <MenuItem value={"FEMALE"}>Frau</MenuItem>
                        <MenuItem value={"MALE"}>Mann</MenuItem>
                    </Select>
                </FormControl>}
                                  label={"Geschlecht"}
                                  labelPlacement={"start"}/>
                <br/>
                <FormControlLabel control={<TextField type={"date"}
                                                      name={"birthday"}
                                                      onChange={handleInputOnChange}
                                                      label={"Geburtstag"}
                                                      size={"small"}/>}
                                  label={"Geburtstag"}
                                  labelPlacement={"start"}/>
                <br/>
                <FormControlLabel control={<TextField type={"number"}
                                                      name={"userWeight"}
                                                      onChange={handleInputOnChange}
                                                      label={"Gewicht"}
                                                      size={"small"}
                                                      style={{width: 150}}/>}
                                  label={"Gewicht"}
                                  labelPlacement={"start"}/>

                <br/>
                <FormControlLabel control={<TextField type={"number"}
                                                      name={"userHeight"}
                                                      onChange={handleInputOnChange}
                                                      label={"Größe"}
                                                      size={"small"}
                                                      style={{width: 150}}/>}
                                  label={"Größe"}
                                  labelPlacement={"start"}/>
                <br/>
                <FormControlLabel control={<TextField type={"password"}
                                                      name={"password"}
                                                      onChange={handleInputOnChange}
                                                      label={"Passwort"}
                                                      size={"small"}/>}
                                  label={"Passwort"}
                                  labelPlacement={"start"}/>
                <br/>
                <Button type={"submit"} variant={"contained"} color={"success"}>Registrieren</Button><br/>
                <a href={"/login"} style={{fontSize: "smaller"}}>Ich habe bereits ein Account</a>
            </form>
        </Box>
    )
}