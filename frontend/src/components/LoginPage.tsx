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

    function handleOnClick(){
        navigate("/signup")
    }

    return (
        <section>
            <form onSubmit={onSubmit}>
                <input type={"text"} value={userName} name={"userName"} onChange={handleUsernameOnChange}/><br/>
                <input type={"password"}
                       value={password}
                       name={"password"}
                       onChange={handlePasswordOnChange}
                       autoComplete={"false"}/><br/>
                <button type={"submit"}>Login</button>
            </form>
            <button onClick={handleOnClick}>Registrieren</button>
        </section>
    )
}