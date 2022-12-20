import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    login: (username: string, password: string) => Promise<string>
}


export default function LoginPage(props: LoginPageProps){

    const [userName, setUserName] = useState<string>("anton")
    const [password, setPassword] = useState<string>("123")

    const navigate = useNavigate()

    function inputUsernameOnChange(event: ChangeEvent<HTMLInputElement>){
        setUserName(event.target.value)
    }

    function inputPasswordOnChange(event: ChangeEvent<HTMLInputElement>){
        setPassword(event.target.value)
    }

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        props.login(userName, password)
            .then(() => navigate("exercises"))
    }

    return(
        <>
            <form onSubmit={onSubmit}>
                <input type={"text"} value={userName} name={"userName"} placeholder={"StandardUser"} onChange={inputUsernameOnChange}/><br/>
                <input type={"password"} value={password} name={"password"} placeholder={"password"} onChange={inputPasswordOnChange}/><br/>
                <button type={"submit"}>Login</button>
            </form>
        </>
    )
}