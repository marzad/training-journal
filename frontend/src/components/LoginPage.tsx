import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    login: (username: string, password: string) => Promise<string>
}


export default function LoginPage(props: LoginPageProps) {

    const [userName, setUserName] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    function handleUsernameOnChange(event: ChangeEvent<HTMLInputElement>) {
        setUserName(event.target.value)
    }

    function handlePasswordOnChange(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        props.login(userName, password)
            .then(() => navigate("/menu"))
    }

    function handleRegisterOnClick() {
        navigate("/signup")
    }

    return (
        <Box component={"section"}>
            <form onSubmit={onSubmit}>

                <TextField type={"text"}
                           value={userName}
                           name={"userName"}
                           onChange={handleUsernameOnChange}
                           label={"Username"}/><br/>
                <TextField type={"password"}
                           value={password}
                           name={"password"}
                           onChange={handlePasswordOnChange}
                           autoComplete={"false"}
                           label={"Passwort"}/><br/>
                <Button type={"submit"}
                variant={"contained"}
                color={"success"}>Login</Button>
            </form>
            <Button onClick={handleRegisterOnClick}>Registrieren</Button>
        </Box>
    )
}