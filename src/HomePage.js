import React from "react";
import CurrentRoundComponent from "./CurrentRoundComponent";
import BetsFormComponent from "./BetsFormComponent";


function HomePage(props){


    return(
        <div>
            <CurrentRoundComponent bets={props.bets} updateBets={props.updateBets} matches={props.matches} inGame={props.inGame}/>
            <BetsFormComponent bets={props.bets}/>
        </div>
    )

}

export default HomePage;