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

    function handleOnClick() {
        navigate(-1)
    }

    return (
        <section>
            {props.weekId}
            <table>
                <tbody>
                <tr>
                    <td>Montag</td>
                    <td>{mapExercises("MONDAY")}</td>
                </tr>
                <tr>
                    <td>Dienstag</td>
                    <td>{mapExercises("TUESDAY")}</td>
                </tr>
                <tr>
                    <td>Mittwoch</td>
                    <td>{mapExercises("WEDNESDAY")}</td>
                </tr>
                <tr>
                    <td>Donnerstag</td>
                    <td>{mapExercises("THURSDAY")}</td>
                </tr>
                <tr>
                    <td>Freitag</td>
                    <td>{mapExercises("FRIDAY")}</td>
                </tr>
                <tr>
                    <td>Samstag</td>
                    <td>{mapExercises("SATURDAY")}</td>
                </tr>
                <tr>
                    <td>Sonntag</td>
                    <td>{mapExercises("SUNDAY")}</td>
                </tr>
                </tbody>
            </table>
            <button onClick={handleOnClick}>zurück</button>
        </section>
    )
}