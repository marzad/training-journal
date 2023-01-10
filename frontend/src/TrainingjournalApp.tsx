import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/UseUser";
import ExercisePage from "./components/ExercisePage";
import HeadPage from "./pages/HeadPage";
import useExercise from "./hooks/UseExercise";
import "../src/css/TrainingjournalApp.css"
import PersonalData from "./components/PersonalData";
import SignUp from "./components/SignUpPage";
import Menu from "./pages/Menu";

export default function TrainingjournalApp(){

    const {userName, login, selectedExercisesList} = useUser()
    const {exercises} = useExercise()

    return(
        <BrowserRouter>
            <header>
                <h1>Trainingjournal</h1>
            </header>
            <section>
                <Routes>
                    <Route path={"/login"} element={<LoginPage login={login}/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/user"} element={<PersonalData username={userName}/>}/>
                    <Route path={"/exercises"}
                           element={<ExercisePage
                               exercises={exercises}
                               selectedExercisesList={selectedExercisesList}
                               username={userName}/>}/>
                    <Route path={"/menu"} element={<HeadPage username={userName}/>}/>
                </Routes>
            </section>

            <footer>
                <Menu/>
            </footer>
        </BrowserRouter>
    )
}