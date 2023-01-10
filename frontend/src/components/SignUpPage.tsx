import {Gender} from "../model/Gender";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

export default function SignUp() {

    type SignupDataForm = {
        username: string,
        gender: Gender,
        birthday: string,
        userWeight: number,
        bodysize: number,
        password: string
    }
    const initSignupData: SignupDataForm = {
        username : "",
        gender : Gender.FEMALE,
        birthday : "",
        userWeight : 0.0,
        bodysize : 0.0,
        password : ""
    }

    const [formInput, setFormInput] = useState<SignupDataForm>(initSignupData)

    const navigate = useNavigate()

    function handlingFormOnChange(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        axios.post("/api/users/newuser/",
            formInput)
            .then(response => response.data)
            .catch(error => console.log(error))
        navigate("/menu")
    }

    function handlingInputOnChange(event: ChangeEvent<HTMLInputElement>){

        let eventName = event.target.name
        let eventValue = event.target.value

        setFormInput(prevState => ({...prevState, [eventName] : eventValue}))
    }

    function handlingSelectOnChange(event: ChangeEvent<HTMLSelectElement>){

        setFormInput(prevState => ({...prevState, [event.target.name] : event.target.value}))

    }

    return (
        <section>
            <form onSubmit={handlingFormOnChange}>
                <label>Username </label><input type={"text"} name={"username"} onChange={handlingInputOnChange}/><br/>
                <label>Geschlecht </label><select size={1} name={"gender"} onChange={handlingSelectOnChange}>
                    <option value={"default"}></option>
                    <option value={"FEMALE"}>Frau</option>
                    <option value={"MALE"}>Mann</option>
                </select><br/>
                <label>Geburtsdatum </label><input type={"date"} name={"birthday"} onChange={handlingInputOnChange}/><br/>
                <label>Gewicht </label><input type={"number"} step={"any"} name={"userWeight"} onChange={handlingInputOnChange}/><br/>
                <label>Größe </label><input type={"number"} step={"any"} name={"bodysize"} onChange={handlingInputOnChange}/><br/>
                <label>Password </label><input type={"password"} name={"password"} onChange={handlingInputOnChange} autoComplete={""}/><br/>
                <button type={"submit"}>Registrieren </button>
            </form>
        </section>
    )
}