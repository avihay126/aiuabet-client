import React from "react";
import sortTeamForTable from "./SortTeamForTable";
import SortTeamForTable from "./SortTeamForTable";

function MiniTableComponent(props){

    const {sortTeams} = SortTeamForTable()

    return(

                <table className={"minTable"}>
                    <thead>
                    <tr>
                        <th>P.</th>
                        <th>Team</th>
                        <th>Games</th>
                        <th>Diff</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortTeams(props.teams).map((team, index) => (
                        <tr key={index}>
                            <td>{index+1}.</td>
                            <td>{team.name}</td>
                            <td>{team.teamStatistics.gamesPlayed}</td>
                            <td>{team.teamStatistics.goalsScored} - {team.teamStatistics.goalsConceded}</td>
                            <td>{team.teamStatistics.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>


    )
}

export default MiniTableComponent;