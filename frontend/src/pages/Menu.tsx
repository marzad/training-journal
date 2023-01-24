import {NavLink} from "react-router-dom";
import UserApiCall from "../hooks/UserApiCall";

export default function Menu() {

    const {logout} = UserApiCall()

    return (
        <section>
            <NavLink to={"/menu"}>Hauptmenü</NavLink>
            <NavLink to={"/login"} onClick={logout}>Ausloggen</NavLink>

        </section>
    )
}