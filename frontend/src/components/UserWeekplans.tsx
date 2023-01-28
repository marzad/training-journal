import {useNavigate} from "react-router-dom";
import {Day} from "../model/Day";
import useUserWeekplansApiCalls from "../hooks/UseUserWeekplansApiCalls";
import {Box, Button, Typography} from "@mui/material";

type UserWeekplansProps = {
    weekId: (id: string) => void,
    dailyPlans: (plans: Set<Day>) => void
}

export default function UserWeekplans(props: UserWeekplansProps) {

    const {userPlans} = useUserWeekplansApiCalls()

    const navigate = useNavigate()

    const currentWeekday = (value: string) => {

        const searchedDay = userPlans?.find(weekItem => {
            return weekItem.weekId === value
        })!

        props.weekId(value)
        props.dailyPlans(searchedDay.dailyPlans)
        navigate("/weekoverview")
    }

    const mappedUserPlans = userPlans?.map(week => {
        return (
            <div key={week.weekId}>
                <Button value={week.weekId}
                        onClick={() => currentWeekday(week.weekId)}
                        key={week.weekId}>{week.weekId}</Button><br/>
            </div>
        )
    })

    function handleReturnOnClick() {
        navigate("/menu")
    }

    return (
        <Box component={"section"}>
            <Typography variant={"h5"}>Archiv</Typography>
            {userPlans?.length !== 0 ? mappedUserPlans : "Es gibt noch keine Trainingspläne!"}<br/>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
        </Box>
    )
}