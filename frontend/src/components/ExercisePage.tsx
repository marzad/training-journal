import ExerciseDetails from "./ExerciseDetails";
import {ChangeEvent, FormEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import ExerciseApiCalls from "../hooks/ExerciseApiCalls";
import {ExerciseDTO} from "../model/ExerciseDTO";
import {Box, Button, FormControlLabel, TextField} from "@mui/material";


type ExercisePageProps = {
    exercises?: ExerciseDTO[]
    selectedExercisesList: (exercisesList: ExerciseDTO[]) => void
    username: string | undefined
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
        if (checked) {
            if (checkExerciseInList(exerciseId) === undefined) {
                const selectedExercise: ExerciseDTO = exercisesList.find(exerciseItem => {
                    return exerciseItem.id === exerciseId
                })!

                setSelectedExercises(prevSelectedExercises => [...prevSelectedExercises, selectedExercise])
            }
        } else {
            if (checkExerciseInList(exerciseId) !== undefined) {
                const newSelectedExercisesList = selectedExercises.filter(exerciseItem => {
                    return exerciseItem.id !== exerciseId
                })

                setSelectedExercises(newSelectedExercisesList)
            }
        }
    }

    function checkExerciseInList(exerciseId: string) {
        return selectedExercises.find(exerciseItem => {
            return exerciseItem.id === exerciseId
        })
    }

    exercisesList.sort((a, b) => a.description.localeCompare(b.description))

    const exerciseDetailComponents = exercisesList
        .map(exerciseEntity => {
            return (
                <div key={exerciseEntity.id.toString()}>
                    <ExerciseDetails exercise={exerciseEntity}
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

    function handleReturnOnClick() {
        navigate("/menu")
    }

    return (
        <Box component={"section"}>
            <form onSubmit={onSubmit}>
                {exerciseDetailComponents}
                <br/>
                <Button type={"submit"}
                        variant={"contained"}
                        color={"success"}
                        disabled={selectedExercises.length === 0}> Persönliche Auswahl speichern
                </Button>
                <br/>
            </form>

            <FormControlLabel control={<TextField type={"text"}
                                                  name={"newExercise"}
                                                  value={newExercise}
                                                  onChange={inputNewExercise}
                                                  label={"Neue Übung"}
                                                  size={"small"}/>}
                              label={<Button onClick={onClickNewExercise}
                                             variant={"contained"}
                                             color={"success"}> Neue Übung hinzufügen</Button>}/>
            <br/>
            <Button variant={"outlined"}
                    size={"small"}
                    onClick={handleReturnOnClick}
                    color={"success"}
                    style={{margin: 5}}
            >zurück</Button>
        </Box>
    )
}