import {useNavigate} from "react-router-dom";
import "../css/MainPage.css"
import React  from "react";
import {Box, Button} from "@mui/material";

export default function MainPage(){

    const navigate = useNavigate()

    function handlePersonalDataNavigation(){
        navigate("/user")
    }

    function handleWeekPlanNavigation(){
        navigate("/weekdays")
    }

    function handleCalendarNavigation(){
        navigate("/plansoverview")
    }

    function handleSettings(){
        navigate("/settings")
    }

    return(
        <Box component={"section"}>
            <div>
                <Button onClick={handleWeekPlanNavigation}>Wochenplan erstellen</Button><br/>
                <Button onClick={handlePersonalDataNavigation}>Gewicht eintragen</Button><br/>
                <Button onClick={handleCalendarNavigation}>Archiv</Button><br/>
                <Button onClick={handleSettings}>Persönliche Daten</Button><br/>
            </div>
        </Box>
    )
}