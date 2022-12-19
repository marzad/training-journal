import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";

type LoginPageProps = {
    login: (username: string, password: string) => void
}


export default function LoginPage(props: LoginPageProps){

    const [userName, setUserName] = useState<string>("StandardUser")
    const [password, setPassword] = useState<string>("")

    const navigate = useNavigate()

    function inputOnChange(event: ChangeEvent<HTMLInputElement>){
        if(event.type === "text"){
            setUserName(event.target.value)
        }else{
            setPassword(event.target.value)
        }
    }

    function onSubmit(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        props.login(userName, password)
        navigate("exercises")
    }



    return(
        <>
            <form onSubmit={onSubmit}>
                <input type={"text"} value={userName} placeholder={"StandardUser"} onChange={inputOnChange}/><br/>
                <input type={password} value={password} placeholder={"password"} onChange={inputOnChange}/><br/>
                <button type={"submit"}>Login</button>

            </form>


        </>
    )
}