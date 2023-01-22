import {ChangeEvent, FormEvent, useState} from "react";
import UserWeightDetails from "./UserWeightDetails";
import PersonalDataApiCalls from "../hooks/PersonalDataApiCalls";
import {useNavigate} from "react-router-dom";
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function PersonalData() {

    const {username, userWeightList, submitUserWeightData, chartData} = PersonalDataApiCalls()

    const [formInput, setFormInput] = useState<number>(0.5)

    const navigate = useNavigate()


    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setFormInput(Number(event.target.value))
    }

    function handleFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        submitUserWeightData(username!, formInput)
    }

    const getUserWeightDetails = userWeightList.map(weightItems => {
        return <UserWeightDetails userWeight={weightItems} key={weightItems.date.toString()}/>
    })

    function handleOnClick(){
        navigate("/menu")
    }

    const renderLineChart = () => {
        return(
            <LineChart width={400} height={200} data={chartData}>
                <Line type={"monotone"} dataKey={"uv"}/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis/>
            </LineChart>
            )
    }

    return (
        <section>
            <form onSubmit={handleFormOnChange}>
                <label>Gewicht</label><input type={"text"} onChange={handleInputOnChange} name={"userWeight"}/><br/>
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