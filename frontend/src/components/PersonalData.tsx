import {ChangeEvent, FormEvent, useState} from "react";
import PersonalDataApiCalls from "../hooks/PersonalDataApiCalls";
import {useNavigate} from "react-router-dom";
import {LineChart, Line, CartesianGrid, XAxis, YAxis} from 'recharts';
import "../css/PersonalData.css"
import {Box, Button, FormControlLabel, TextField} from "@mui/material";


export default function PersonalData() {

    const {username, userWeightList, submitUserWeightData, chartData} = PersonalDataApiCalls()

    const [formInput, setFormInput] = useState<number>(0.5)

    const navigate = useNavigate()


    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setFormInput(Number(event.target.value))
    }

    function handleFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if(username !== undefined && username !== ""){
            submitUserWeightData(username, formInput)
        }
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

    function handleReturnOnClick() {
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
        <Box component={"section"}>
            <form onSubmit={handleFormOnChange}>
                <FormControlLabel control={<TextField type={"number"}
                                                      onChange={handleInputOnChange}
                                                      name={"userWeight"}
                                                      size={"small"}
                label={"Gewicht"}/>}
                                  label={<Button type={"submit"}>Speichern</Button>}/>

            </form>
            <form>
                <table>
                    <thead>
                    <td>Datum</td>
                    <td>Gewicht</td>
                    <td>BMI</td>
                    </thead>
                </table>
                {getUserWeightDetails}
            </form>
            <div className={"Linechart"}>
                <label>BMI</label><br/>
                {renderLineChart()}
            </div>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
        </Box>
    )
}