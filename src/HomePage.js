import React from "react";
import CurrentRoundComponent from "./Schedule/CurrentRoundComponent";
import BetsFormComponent from "./Bets/BetsFormComponent";
import MiniTableComponent from "./TABLES/MiniTableComponent";


function HomePage(props){


    return(
        <div>
            <CurrentRoundComponent bets={props.bets} updateBets={props.updateBets} matches={props.matches} inGame={props.inGame}/>
            <BetsFormComponent updateState={props.updateState} user={props.user} inGame={props.inGame} loggedIn={props.loggedIn} bets={props.bets} updateBets={props.updateBets}/>
            <div type={"table-container"} className={"main-minTable-container"}>
                <MiniTableComponent teams={props.teams}/>
            </div>

        </div>
    )

}

export default HomePage;