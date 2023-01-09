import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/UseUser";
import ExercisePage from "./components/ExercisePage";
import HeadPage from "./pages/HeadPage";
import useExercise from "./hooks/UseExercise";
import "../src/css/TrainingjournalApp.css"
import PersonalData from "./components/PersonalData";

export default function TrainingjournalApp(){

    const {userName, login, selectedExercisesList} = useUser()
    const {exercises} = useExercise()

    return(
        <BrowserRouter>
            <header>
                <h1>Trainingjournal</h1>
            </header>
            <section>
                <h2>Hallo {userName}!</h2>
                <Routes>
                    <Route path={"/"} element={<LoginPage login={login}/>}/>
                    <Route path={"/user"} element={<PersonalData/>}/>
                    <Route path={"/exercises"} element={<ExercisePage exercises={exercises} selectedExercisesList={selectedExercisesList}/>}/>
                    <Route path={"/menu"} element={<HeadPage/>}/>
                </Routes>
            </section>

            <footer>
                Menu
            </footer>
        </BrowserRouter>
    )
}