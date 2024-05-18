import React from "react";
import CurrentRoundComponent from "./CurrentRoundComponent";
import BetsFormComponent from "./BetsFormComponent";
import MiniTableComponent from "./MiniTableComponent";


function HomePage(props){


    return(
        <div>
            <CurrentRoundComponent bets={props.bets} updateBets={props.updateBets} matches={props.matches} inGame={props.inGame}/>
            <BetsFormComponent updateState={props.updateState} user={props.user} inGame={props.inGame} loggedIn={props.loggedIn} bets={props.bets} updateBets={props.updateBets}/>
            <MiniTableComponent teams={props.teams}/>
        </div>
    )

}

export default HomePage;