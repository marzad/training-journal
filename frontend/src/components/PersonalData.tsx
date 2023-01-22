import {ChangeEvent, FormEvent, useState} from "react";
import UserWeightDetails from "./UserWeightDetails";
import PersonalDataApiCalls from "../hooks/PersonalDataApiCalls";
import {useNavigate} from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function PersonalData() {

    const {username, userWeightList, submitUserWeightData, chartData} = PersonalDataApiCalls()

    type PersonalDataForm = {
        newUsername: string,
        userWeight: number
    }
    const initPersonalData = {
        newUsername: "",
        userWeight: 0.5
    }

    const [formInput, setFormInput] = useState<PersonalDataForm>(initPersonalData)

    const navigate = useNavigate()


    function handlingInputOnChange(event: ChangeEvent<HTMLInputElement>) {

        let eventName = event.target.name
        let eventValue = event.target.value
        setFormInput(prevState => ({...prevState, [eventName]: eventValue}))
    }

    function handlingFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        submitUserWeightData(username!, formInput.userWeight, formInput.newUsername)
    }

    const getUserWeightDetails = userWeightList.map(weightItems => {
        return <UserWeightDetails userWeight={weightItems} key={weightItems.date.toString()}/>
    })

    function handleOnClick(){
        navigate("/menu")
    }

    const renderLineChart = () => {
        return(
            <LineChart width={400} height={300} data={chartData}>
                <Line type={"monotone"} dataKey={"uv"}/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis/>
            </LineChart>
            )
    }

    return (
        <section>
            <form onSubmit={handlingFormOnChange}>
                <label>Username</label><input type={"text"} onChange={handlingInputOnChange} name={"newUsername"}
                                              placeholder={username}/><br/>
                <label>Gewicht</label><input type={"text"} onChange={handlingInputOnChange} name={"userWeight"}/><br/>
                <button type={"submit"}>Speichern</button>
            </form>
            <form>
                {getUserWeightDetails}
                {renderLineChart()}
            </form>
            <button onClick={handleOnClick}>zurück</button>
        </section>
    )
}