import React from "react";

export default function Header(){

    return(
        <section>
            <h1>Trainingjournal</h1>
            <img src={require("../images/gym-icon.png")} alt={"gym-icon"} width={"30%"}/>
        </section>
    )
}