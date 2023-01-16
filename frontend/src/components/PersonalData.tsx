import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import UserWeightDetails from "./UserWeightDetails";
import PersonalDataApiCalls from "../hooks/PersonalDataApiCalls";


type PersonalDataProps = {
    username: string | undefined
}

export default function PersonalData(props: PersonalDataProps) {

    const {userWeightList, submitUserWeightData, getUserWeightData} = PersonalDataApiCalls()

    type PersonalDataForm = {
        newUsername: string,
        userWeight: number
    }
    const initPersonalData = {
        newUsername: "",
        userWeight: 0.5
    }

    const [formInput, setFormInput] = useState<PersonalDataForm>(initPersonalData)

    useEffect(() => {
        getUserWeightData(props.username!)
            .catch(error => console.error(error))
        //eslint-disable-next-line
    }, [])

    function handlingInputOnChange(event: ChangeEvent<HTMLInputElement>) {

        let eventName = event.target.name
        let eventValue = event.target.value
        setFormInput(prevState => ({...prevState, [eventName]: eventValue}))
    }

    function handlingFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        submitUserWeightData(props.username!, formInput.userWeight, formInput.newUsername)
    }

    const getUserWeightDetails = userWeightList.map(weightItems => {
        return <UserWeightDetails userWeight={weightItems} key={weightItems.date.toString()}/>
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