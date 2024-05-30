import React, {useEffect, useState} from 'react';
import '../Styles/TablePageStyle.css';
import axios from "axios";
import TeamMatchesComponent from "../Stat/TeamMatchesComponent";
import TeamNameComponent from "../Stat/TeamNameComponent";
import PrintTeamPlayers from "../Stat/PrintTeamPlayers";
import sortTeamForTable from "./SortTeamForTable";
import SortTeamForTable from "./SortTeamForTable";
import {API_URL} from "../Constants/Constants";





function TableComponent(props) {

    const [teamSelected, setTeamSelected] = useState(null);
    const[teamMatches, setTeamMatches] = useState([]);
    const[ teamPlayers, setTeamPlayers] = useState([]);
    const {sortTeams} = SortTeamForTable();




    useEffect(()=>{
        getTeamMatches()
        getTeamPlayers()
    },[teamSelected])





    const sortMatchesByRound = (matches) => {
        const sortedMatches = [...matches].sort((a, b) => a.round - b.round);
        return sortedMatches;
    };

    const getTeamMatches =()=>{
        if (teamSelected!= null){
            axios.get(API_URL+"get-team-matches?teamId="+teamSelected.id)
                .then((response)=>{

                    setTeamMatches(sortMatchesByRound(response.data))
                })
        }

    }
    const getTeamPlayers =()=>{
        if (teamSelected!= null){
            axios.get(API_URL+"get-team-players?teamId=" + teamSelected.id)
                .then((response)=>{
                    setTeamPlayers(response.data)
                })
        }

    }





    return (
        <div>
            <div type={"table-container"} className={teamSelected == null? "bigTable-container": "smallTable-container"} >
                <table className={teamSelected == null? "bigTable": "smallTable"}>
                    <thead>
                    <tr>
                        <th>P.</th>
                        <th>Team</th>
                        <th>Games</th>
                        <th>Wins</th>
                        <th>Draws</th>
                        <th>Losses</th>
                        <th>Goals</th>
                        <th>Conceded</th>
                        <th>Difference</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortTeams(props.teams).map((team, index) => (
                        <tr key={index}>
                            <td>{index+1}.</td>
                            <td className={"teamName"} onClick={()=>{setTeamSelected(team)}} >{team.name}</td>
                            <td>{team.teamStatistics.gamesPlayed}</td>
                            <td>{team.teamStatistics.wins}</td>
                            <td>{team.teamStatistics.draws}</td>
                            <td>{team.teamStatistics.losses}</td>
                            <td>{team.teamStatistics.goalsScored}</td>
                            <td>{team.teamStatistics.goalsConceded}</td>
                            <td>{team.teamStatistics.goalsScored - team.teamStatistics.goalsConceded}</td>
                            <td>{team.teamStatistics.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
            {teamSelected != null && (
                <div>
                    <TeamMatchesComponent matches={teamMatches} setMatches={setTeamMatches}/>
                    <div type={"table-container"} className={"teamName-players-container"}>
                        <TeamNameComponent teamName={teamSelected.name}/>
                        <PrintTeamPlayers players={teamPlayers}/>
                    </div>
                </div>


            )}
        </div>

    );
}

export default TableComponent;
