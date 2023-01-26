import {ChangeEvent, FormEvent, useState} from "react";
import useUserWeightDataApiCalls from "../hooks/UseUserWeightDataApiCalls";
import {useNavigate} from "react-router-dom";
import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
} from 'recharts';
import "../css/PersonalData.css"
import {Box, Button, FormControlLabel, TextField, Typography} from "@mui/material";


export default function UserWeightData() {

    const {username, userWeightList, submitUserWeightData, chartData} = useUserWeightDataApiCalls()

    const [formInput, setFormInput] = useState<number>(0.5)

    const navigate = useNavigate()


    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setFormInput(Number(event.target.value))
    }

    function handleFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (username !== undefined && username !== "") {
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
            <LineChart width={250} height={250} data={chartData}
                       margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" angle={45} tick={{fontSize: 10}}/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend/>
                <Line type="monotone" dataKey="bmi" stroke="#8884d8" activeDot={{r: 8}}/>
                <Line type="monotone" dataKey="weight" stroke="#82ca9d" />
            </LineChart>
        )
    }

    return (
        <Box component={"section"}>
            <section>
                <Typography variant={"h5"}>Gewicht und BMI</Typography>
                {renderLineChart()}
            </section>
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
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
        </Box>
    )
}