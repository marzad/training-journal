import {useNavigate} from "react-router-dom";
import {Day} from "../model/Day";
import UserWeekplansApiCalls from "../hooks/UserWeekplansApiCalls";

type UserWeekplansProps = {
    weekId: (id: string) => void,
    dailyPlans: (plans: Set<Day>) => void
}

export default function UserWeekplans(props: UserWeekplansProps) {

    const {userPlans} = UserWeekplansApiCalls()

    const navigate = useNavigate()

    const handleOnClick = (value: string) => {

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
            <button value={week.weekId}
                    onClick={() => handleOnClick(week.weekId)}
                    key={week.weekId}>{week.weekId}</button>
        )
    })

    function handleOnClickReturn(){
        navigate("/menu")
    }

    return (
        <section>
            {mappedUserPlans}<br/>
            <button onClick={handleOnClickReturn}>zurück</button>
        </section>
    )
}