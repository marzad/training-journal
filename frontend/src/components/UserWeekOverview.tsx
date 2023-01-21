import {Day} from "../model/Day";
import {Exercise} from "../model/Exercise";
import "../css/UserWeekOverview.css"
import {useNavigate} from "react-router-dom";


type UserWeekOverviewProps = {
    weekId: string,
    dailyPlans: Set<Day>
}


export default function UserWeekOverview(props: UserWeekOverviewProps) {

    const navigate = useNavigate()

    const day = (searchedWeekday: string) => {
        let plan: { exercises: Exercise[], notes?: string, trainigfree: boolean } = {
            exercises: [],
            notes: "",
            trainigfree: false
        }

        props.dailyPlans.forEach(({weekday, exercises, notes, trainingfree}) => {
            if (weekday === searchedWeekday) {
                plan.exercises = exercises
                plan.notes = notes
                plan.trainigfree = trainingfree
            }
        })
        return plan
    }

    const mapExercises = (weekday: string) => {
        const dailyPlan = day(weekday)
        if (dailyPlan.trainigfree) {
            return (
                <p>
                    kein Training<br/>
                    {dailyPlan.notes}
                </p>
            )
        } else {
            return (
                <div>
                    {
                        dailyPlan.exercises.map(exercise => {
                            if (exercise.repeats !== 0)
                                return (
                                    <p>
                                        {exercise.description}&nbsp;
                                        {exercise.repeats}
                                        {exercise.sets !== 0 ? "/" + exercise.sets : ""}
                                        {exercise.weight !== 0 ? "/" + exercise.weight : ""}
                                        <br/>
                                    </p>
                                )
                            return <></>
                        })
                    }
                    {dailyPlan.notes}
                </div>
            )
        }
    }

    function handleOnClick(){
        navigate(-1)
    }

    return (
        <section>
            {props.weekId}
            <table>
                <thead>
                <tr>
                    <th>Montag</th>
                    <th>Dienstag</th>
                    <th>Mittwoch</th>
                    <th>Donnerstag</th>
                    <th>Freitag</th>
                    <th>Samstag</th>
                    <th>Sonntag</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>{mapExercises("MONDAY")}</td>
                    <td>{mapExercises("TUESDAY")}</td>
                    <td>{mapExercises("WEDNESDAY")}</td>
                    <td>{mapExercises("THURSDAY")}</td>
                    <td>{mapExercises("FRIDAY")}</td>
                    <td>{mapExercises("SATURDAY")}</td>
                    <td>{mapExercises("SUNDAY")}</td>
                </tr>
                </tbody>
            </table>

            <button onClick={handleOnClick}>zurück</button>
        </section>
    )
}