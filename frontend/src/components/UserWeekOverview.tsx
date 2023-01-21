import {Day} from "../model/Day";
import {Exercise} from "../model/Exercise";


type UserWeekOverviewProps = {
    weekId: string,
    dailyPlans: Set<Day>
}


export default function UserWeekOverview(props: UserWeekOverviewProps) {

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
                <label>
                    {dailyPlan.notes}
                </label>
            )
        } else {
            return (
                <>
                    {
                        dailyPlan.exercises.map(exercise => {
                            if (exercise.repeats !== 0)
                                return (
                                    <>
                                        {exercise.description}
                                        {exercise.repeats}
                                        {exercise.sets !== 0 ? exercise.sets : ""}
                                        {exercise.weight !== 0 ? exercise.weight : ""}
                                        <br/>
                                    </>
                                )
                            return <></>
                        })
                    }
                    {dailyPlan.notes}
                </>
            )
        }
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
                    <th>{mapExercises("MONDAY")}</th>
                    <th>{mapExercises("TUESDAY")}</th>
                    <th>{mapExercises("WEDNESDAY")}</th>
                    <th>{mapExercises("THURSDAY")}</th>
                    <th>{mapExercises("FRIDAY")}</th>
                    <th>{mapExercises("SATURDAY")}</th>
                    <th>{mapExercises("SUNDAY")}</th>
                </tr>
                </tbody>
            </table>
        </section>
    )
}