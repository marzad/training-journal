import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/UseUser";
import ExercisePage from "./components/ExercisePage";
import HeadPage from "./pages/HeadPage";
import useExercise from "./hooks/UseExercise";

export default function TrainingjournalApp(){

    const {userName, login, selectedExercisesList} = useUser()
    const {exercises} = useExercise()

    return(
        <BrowserRouter>
            <h1>Trainingjournal</h1>
            <h2>Hallo {userName}!</h2>
            <Routes>
                <Route path={""} element={<LoginPage login={login}/>}/>
                <Route path={"/exercises"} element={<ExercisePage exercises={exercises} selectedExercises={selectedExercisesList}/>}/>
                <Route path={"/menu"} element={<HeadPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}