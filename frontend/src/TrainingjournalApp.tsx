import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/UseUser";
import ExercisePage from "./components/ExercisePage";
import useExercise from "./hooks/UseExercise"

export default function TrainingjournalApp(){

    const {userName, login} = useUser()
    const {exercises} = useExercise()

    // @ts-ignore
    return(
        <BrowserRouter>
            <h1>Trainingjournal</h1>
            <h2>Hallo {userName}!</h2>
            <Routes>
                <Route path={""} element={<LoginPage login={login}/>}/>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
                <Route path={"/exercise"} element={<ExercisePage exercises={exercises}/>}/>
            </Routes>
        </BrowserRouter>
    )
}