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
import {
    Box,
    Button,
    FormControlLabel,
    Table, TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";

type UserWeightDataProps = {
    username: string
}


export default function UserWeightData(props: UserWeightDataProps) {

    const {userWeightList, submitUserWeightData, chartData} = useUserWeightDataApiCalls({username: props.username})

    const [formInput, setFormInput] = useState<number>(0.5)

    const navigate = useNavigate()


    function handleInputOnChange(event: ChangeEvent<HTMLInputElement>) {
        setFormInput(Number(event.target.value))
    }

    function handleFormOnChange(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        if (props.username) {
            submitUserWeightData(props.username, formInput)
        }
    }

    const rows = userWeightList.map(weightItems => {
        return {date: weightItems.date.toString(), weight: weightItems.weight, bmi: weightItems.bmi}
    })

    function handleReturnOnClick() {
        navigate("/menu")
    }

    const renderLineChart = () => {
        return (
            <LineChart width={350} height={250} data={chartData}
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
                <Line type="monotone" dataKey="bmi" stroke="#8884d8" activeDot={{r: 8}} dot={true}/>
                <Line type="monotone" dataKey="weight" stroke="#82ca9d"/>
            </LineChart>
        )
    }

    return (
        <Box component={"section"}>
            <div>
                <Typography variant={"h5"}>Gewicht und BMI</Typography>
                {renderLineChart()}
            </div>
            <form onSubmit={handleFormOnChange}>
                <FormControlLabel control={<TextField type={"number"}
                                                      onChange={handleInputOnChange}
                                                      name={"userWeight"}
                                                      size={"small"}
                                                      label={"Gewicht"}
                                                      sx={{width: 100}}/>}
                                  label={<Button type={"submit"}>Speichern</Button>}
                                  sx={{margin: 1}}/>

            </form>
            <TableContainer>
                <Table size={"small"}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Datum</TableCell>
                            <TableCell>Gewicht</TableCell>
                            <TableCell>BMI</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => {
                            return (
                                <TableRow key={row.date.toString()}>
                                    <TableCell>{row.date} </TableCell>
                                    <TableCell>{row.weight} </TableCell>
                                    <TableCell>{row.bmi} </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant={"outlined"}
                    sx={{margin: 1}}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
            >zurück</Button>
        </Box>
    )
}