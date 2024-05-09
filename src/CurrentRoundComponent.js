
import React from "react";
import axios from "axios";
import TeamGoals from "./TeamGoals";

function CurrentRoundComponent(props){

    const {getTeamGoals} = TeamGoals();

    return(
        <div>
            {
                this.props.matches.map((match, homeGoals,awayGoals) =>{
                    return(
                        <div>
                            {((100-match.matchProbabilities.homeTeamWin)/100)*4}||{match.homeTeam.name} - {getTeamGoals(match,true)} ||| {getTeamGoals(match,false)} - {match.awayTeam.name}||{((100-match.matchProbabilities.awayTeamWin)/100)*4}
                        </div>
                    )
                })
            }
        </div>
    )
}
export default CurrentRoundComponent;