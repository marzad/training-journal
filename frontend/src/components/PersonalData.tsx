import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import UserWeightDetails from "./UserWeightDetails";


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
        userWeight: 0.5
    }

    const [formInput, setFormInput] = useState<PersonalDataForm>(initPersonalData)

    const [userWeightList, setUserWeightList] = useState<{date: Date, weight: number}[]>([])


    const navigate = useNavigate()

    useEffect(() => {
        getUserWeightData()
    }, [])


    function handlingFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (formInput.userWeight > 0.5) {
            axios.put("/api/users/" + props.username + "/updateweight/", formInput.userWeight,
                {headers: {"Content-type": "text/plain"}})
                .then(response => response.data)
                .then(data => {
                    setUserWeightList(data)
                })
                .catch(error => console.error(error))
        } else {
            axios.put("/api/users/" + props.username + "/updateusername/", formInput.newUsername,
                {headers: {"Content-type": "text/plain"}})
                .catch(error => console.error(error))
                .then(() => navigate("/menu"))
        }

    }

    function handlingInputOnChange(event: ChangeEvent<HTMLInputElement>) {

        let eventName = event.target.name
        let eventValue = event.target.value
        setFormInput(prevState => ({...prevState, [eventName]: eventValue}))
    }

    function getUserWeightData() {
        return axios.get("api/users/" + props.username + "/weight")
            .then(response => response.data)
            .then(data => {
                setUserWeightList(data)
            })
            .catch(error => console.error(error))
    }

    const getUserWeightDetails = userWeightList.map(weightItems => {
        return <UserWeightDetails userWeight={weightItems}/>

    })

    return (
        <section>
            <h2>Hallo {props.username}!</h2>
            <form onSubmit={handlingFormOnChange}>
                <label>Username</label><input type={"text"} onChange={handlingInputOnChange} name={"newUsername"}
                                              placeholder={props.username}/><br/>
                <label>Gewicht</label><input type={"text"} onChange={handlingInputOnChange} name={"userWeight"}/><br/>
                <button type={"submit"}>Speichern</button>
            </form>
            <form>
                {getUserWeightDetails}
            </form>
        </section>
    )
}