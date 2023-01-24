import {ChangeEvent, FormEvent, useState} from "react";
import PersonalDataApiCalls from "../hooks/PersonalDataApiCalls";
import {useNavigate} from "react-router-dom";
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import "../css/PersonalData.css"


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
        return (
            <table key={weightItems.date.toString()}>
                <tbody>
                <tr>
                    <td>
                        {weightItems.date.toString()}
                    </td>
                    <td>
                        {weightItems.weight}
                    </td>
                    <td>
                        {weightItems.bmi}
                    </td>
                </tr>
                </tbody>
            </table>
        )
    })

    function handleOnClick() {
        navigate("/menu")
    }

    const renderLineChart = () => {
        return (
            <LineChart width={350} height={150} data={chartData}>
                <Line type={"monotone"} dataKey={"uv"}/>
                <CartesianGrid stroke="#ccc"/>
                <XAxis dataKey="name"/>
                <YAxis/>
            </LineChart>
        )
    }

    return (
        <section key={0}>
            <form onSubmit={handleFormOnChange}>
                <label>Gewicht</label><input type={"text"} onChange={handleInputOnChange} name={"userWeight"}/><br/>
                <button type={"submit"}>Speichern</button>
            </form>
            <form>
                <table>
                    <thead>
                    <th>Datum</th>
                    <th>Gewicht</th>
                    <th>BMI</th>
                    </thead>
                </table>
                {getUserWeightDetails}
            </form>
            <div className={"Linechart"}>
                <label>BMI</label><br/>
                {renderLineChart()}
            </div>
            <button onClick={handleOnClick}>zurück</button>
        </section>
    )
}