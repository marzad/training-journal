import React, {useState} from "react";
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
import WeekDaysSelect from "./pages/WeekdaysSelect";
import {Weekdays} from "./model/Weekdays";
import SelectDailyExercises from "./components/SelectDailyExercises";
import LogoutPage from "./components/LogoutPage";
import UserWeekplans from "./components/UserWeekplans";
import UserWeekOverview from "./components/UserWeekOverview";
import {Day} from "./model/Day";
import SettingsPage from "./components/SettingsPage";
import Header from "./pages/Header";



export default function TrainingjournalApp(){

    const {userName, login, selectedExercisesList} = useUser()

    const [day, setDay] = useState<Weekdays>()

    const {exercises} = useExercise()

    const [weekId, setWeekId] = useState("")
    const [dailyPlans, setDailyPlans] = useState<Set<Day>>(new Set())

    return(
        <BrowserRouter>
            <header>
                <Header/>
            </header>
            <section>
                <Routes>
                    <Route path={"/"} element={<LoginPage login={login}/>}/>
                    <Route path={"/login"} element={<LoginPage login={login}/>}/>
                    <Route path={"/signup"} element={<SignUp/>}/>
                    <Route path={"/user"} element={<PersonalData/>}/>
                    <Route path={"/exercises"}
                           element={<ExercisePage
                               exercises={exercises}
                               selectedExercisesList={selectedExercisesList}
                               username={userName}/>}/>
                    <Route path={"/menu"} element={<HeadPage/>}/>
                    <Route path={"/weekdays"} element={<WeekDaysSelect selectedDay={setDay}/>}/>
                    <Route path={"/selectexercises"} element={<SelectDailyExercises day={day} username={userName}/>}/>
                    <Route path={"/logout"} element={<LogoutPage/>}/>
                    <Route path={"/plansoverview"} element={<UserWeekplans weekId={setWeekId} dailyPlans={setDailyPlans}/>}/>
                    <Route path={"/weekoverview"} element={<UserWeekOverview weekId={weekId} dailyPlans={dailyPlans}/>}/>
                    <Route path={"/settings"} element={<SettingsPage/>}/>

                </Routes>
            </section>

            <footer>
                <Menu/>
            </footer>
        </BrowserRouter>
    )
}