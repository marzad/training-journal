import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

type PersonalDataProps = {
    username: string | undefined
}

export default function PersonalData(props: PersonalDataProps) {

    type PersonalDataForm = {
        newUsername: string,
        userWeight: number
    }
    const initPersonalData = {
        newUsername: "",
        userWeight : 0.5
     }

    const [formInput, setFormInput] = useState<PersonalDataForm>(initPersonalData)


    const navigate = useNavigate()


    function handlingFormOnChange(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        if(formInput.userWeight > 0.5){
            axios.put("/api/users/" + props.username + "/updateweight/", formInput.userWeight,
                {headers:{"Content-type":"text/plain"}})
                .catch(error => console.error(error))
                .then(() => navigate("/login"))
        }else{
            axios.put("/api/users/" + props.username + "/updateusername/", formInput.newUsername,
                {headers:{"Content-type":"text/plain"}})
                .catch(error => console.error(error))
                .then(() => navigate("/login"))
        }

    }

    function handlingInputOnChange(event: ChangeEvent<HTMLInputElement>){

        let eventName = event.target.name
        let eventValue = event.target.value

        setFormInput(prevState => ({...prevState, [eventName] : eventValue}))

    }

    return (
        <section>
            <h2>Hallo {props.username}!</h2>
            <form onSubmit={handlingFormOnChange}>
                <label>Username</label><input type={"text"} onChange={handlingInputOnChange} name={"newUsername"} placeholder={props.username}/><br/>
                <label>Gewicht</label><input type={"text"} onChange={handlingInputOnChange} name={"userWeight"}/><br/>
                <button type={"submit"}>Speichern</button>
            </form>
        </section>
    )
}