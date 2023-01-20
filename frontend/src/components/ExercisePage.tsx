import ExerciseDetails from "./ExerciseDetails";
import {ChangeEvent, FormEvent, useState} from "react";
import "../css/ExercisePage.css"
import {useNavigate} from "react-router-dom";
import ExerciseApiCalls from "../hooks/ExerciseApiCalls";
import {ExerciseDTO} from "../model/ExerciseDTO";


type ExercisePageProps = {
    exercises?: ExerciseDTO[]
    selectedExercisesList: (exercisesList: ExerciseDTO[]) => void
    username : string | undefined
}

export default function ExercisePage(props: ExercisePageProps) {
    const [newExercise, setNewExercise] = useState<string>("")
    const {exercisesList, addNewExerciseToDB} = ExerciseApiCalls()

    const [selectedExercises, setSelectedExercises] = useState<ExerciseDTO[]>([])

    const navigate = useNavigate()

    function inputNewExercise(event: ChangeEvent<HTMLInputElement>) {
        setNewExercise(event.target.value)
    }

    function onClickNewExercise() {
        addNewExerciseToDB(newExercise)
        setNewExercise("")
    }

    function setSelectedExercisesList(exerciseId: string, checked: boolean) {
        if(checked){
            if(checkExerciseInList(exerciseId) === undefined){
                const selectedExercise: ExerciseDTO = exercisesList.find(exerciseItem => {
                    return exerciseItem.id === exerciseId
                })!

                setSelectedExercises(prevSelectedExercises => [...prevSelectedExercises, selectedExercise])
            }
        }else{
            if(checkExerciseInList(exerciseId) !== undefined){
                const newSelectedExercisesList = selectedExercises.filter(exerciseItem => {
                    return exerciseItem.id !== exerciseId
                })

                setSelectedExercises(newSelectedExercisesList)
            }
        }
    }

    function checkExerciseInList(exerciseId: string){
        return selectedExercises.find(exerciseItem => {
            return exerciseItem.id === exerciseId
        })
    }
    exercisesList.sort((a, b) => a.description.localeCompare(b.description))
    const exerciseDetailComponents = exercisesList
        .map(exerciseEntity => {
            return (
                <div>
                    <ExerciseDetails key={exerciseEntity.id.toString()} exercise={exerciseEntity}
                                     selectedExercisesForUser={setSelectedExercisesList}/>
                </div>)
        })

    function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (selectedExercises !== undefined) {
            props.selectedExercisesList(selectedExercises)
        }
        navigate("/menu")
    }

    return (
        <section className={"exercisesList"}>
            <h2>Hallo {props.username}!</h2>
            <form onSubmit={onSubmit}>
                {exerciseDetailComponents}
                <br/>
                    <button type={"submit"} disabled={selectedExercises.length === 0}>Auswahl speichern</button>
                <br/>
            </form>
            <input type={"text"} name={"newExercise"} value={newExercise} onChange={inputNewExercise}/>
            <button onClick={onClickNewExercise}> Neue Übung speichern</button>
        </section>
    )
}