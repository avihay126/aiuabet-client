
import "../Styles/PrintRoundStyle.css";
import TeamGoals from "./TeamGoals";
import {useEffect} from "react";
import {IS_AWAY, IS_HOME} from "../Constants/Constants";


function TeamMatchesComponent({matches ,setMatches}){

    const {getTeamGoals} = TeamGoals();






    return(
        <div className={"teamMatches-container"}>
            <table className={"teamMatches"}>
                <thead>
                    <tr>
                        <th className="print-round-th">Round</th>
                        <th className="print-round-th">Home</th>
                        <th className="print-round-th">Score</th>
                        <th className="print-round-th">Away</th>
                    </tr>
                </thead>
                <tbody>
                {
                    matches.map((match)=>{
                        return(
                            <tr className="print-round-row">
                                <td className="print-round-td">{match.round}</td>
                                <td className="print-round-td">{match.homeTeam.name}</td>
                                <td className="print-round-td">
                                    {getTeamGoals(match, IS_HOME)}-{getTeamGoals(match, IS_AWAY)}
                                </td>
                                <td className="print-round-td">{match.awayTeam.name}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    )
}

export default TeamMatchesComponent;