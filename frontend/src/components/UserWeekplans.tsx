import {useNavigate} from "react-router-dom";
import {Day} from "../model/Day";
import UserWeekplansApiCalls from "../hooks/UserWeekplansApiCalls";
import {Box, Button, Typography} from "@mui/material";

type UserWeekplansProps = {
    weekId: (id: string) => void,
    dailyPlans: (plans: Set<Day>) => void
}

export default function UserWeekplans(props: UserWeekplansProps) {

    const {userPlans} = UserWeekplansApiCalls()

    const navigate = useNavigate()

    const currentWeekday = (value: string) => {

        const week = userPlans?.find(weekItem => {
            if (weekItem.weekId === value) {
                return weekItem
            } else {
                return {weekId: weekItem.weekId, dailyPlans: []}
            }
        })!
        props.weekId(value)
        props.dailyPlans(week.dailyPlans)
        navigate("/weekoverview")
    }

    const mappedUserPlans = userPlans?.map(week => {
        return (
            <Button value={week.weekId}
                    onClick={() => currentWeekday(week.weekId)}
                    key={week.weekId}>{week.weekId}</Button>
        )
    })

    function handleReturnOnClick(){
        navigate("/menu")
    }

    return (
        <Box component={"section"}>
            <Typography variant={"h5"}>Archiv</Typography>
            {userPlans?.length !== 0? mappedUserPlans : "Es gibt noch keine Trainingspläne!"}<br/>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
        </Box>
    )
}