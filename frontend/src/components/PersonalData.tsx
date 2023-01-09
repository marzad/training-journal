import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Gender} from "../model/Gender";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function PersonalData() {

    type PersonalDataForm = {
        userName: string,
        birthday: string,
        gender: Gender,
        userWeight: number,
        bodySize: number
    }
    const initPersonalData = {
        userName : "",
        birthday : "",
        gender : Gender.MALE,
        userWeight : 0,
        bodySize : 0
     }

    const [formInput, setFormInput] = useState<PersonalDataForm>(initPersonalData)

    const [userName, setUserName] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        axios.get("/api/users/me")
            .then(response => response.data)
            .then(setUserName)
    }, [])


    function handlingFormOnChange(event: FormEvent<HTMLFormElement>){
        event.preventDefault()
        axios.put("api/users/" + userName +"personaldata/", {params: {formInput}})
            .catch(error => console.error(error))
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
                <label>Username</label><input type={"text"} onChange={handlingInputOnChange} name={"username"}/><br/>
                <label>Geburtsdatum</label><input type={"date"} onChange={handlingInputOnChange} name={"birthday"}/><br/>
                <label>Geschlecht</label><select onChange={handlingSelectOnChange} name={"gender"} size={1}>
                <option value={"FEMALE"}>Frau</option>
                <option value={"MALE"}>Mann</option>
            </select><br/>
                <label>Gewicht</label><input type={"text"} onChange={handlingInputOnChange} name={"userWeight"}/><br/>
                <label>Größe</label><input type={"text"} onChange={handlingInputOnChange} name={"bodySize"}/><br/>
                <button type={"submit"}>Speichern</button>
            </form>
        </section>
    )
}