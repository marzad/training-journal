import {NavLink} from "react-router-dom";

export default function Menu(){

    return(
        <>
        <NavLink to={"/login"}>Einloggen</NavLink>
        <NavLink to={"/signup"}>Registrieren</NavLink>
        <NavLink to={"/menu"}>Hauptmenü</NavLink>
        <label>Ausloggen</label>
        </>
    )
}