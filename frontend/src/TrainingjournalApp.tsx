import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import useUser from "./hooks/UseUser";

export default function TrainingjournalApp(){

    const {userName, login} = useUser()

    return(
        <BrowserRouter>
            <h1>Trainingjournal</h1>
            <h2>Hallo {userName}!</h2>
            <Routes>
                <Route path={""} element={<LoginPage login={login}/>}/>
                <Route path={"/login"} element={<LoginPage login={login}/>}/>
            </Routes>
        </BrowserRouter>
    )
}