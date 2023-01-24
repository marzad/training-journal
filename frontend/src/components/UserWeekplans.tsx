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
            <button value={week.weekId}
                    onClick={() => currentWeekday(week.weekId)}
                    key={week.weekId}>{week.weekId}</button>
        )
    })

    function handleReturnOnClick(){
        navigate("/menu")
    }

    return (
        <section>
            {userPlans?.length !== 0? mappedUserPlans : "Es gibt noch keine Trainingspläne!"}<br/>
            <button onClick={handleReturnOnClick}>zurück</button>
        </section>
    )
}