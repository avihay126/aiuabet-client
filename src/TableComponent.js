import React from 'react';


function TableComponent(props) {
    const sortedTeams = props.teams.sort((a, b) => {
        if (a.teamStatistics.points !== b.teamStatistics.points) {
            return b.teamStatistics.points - a.teamStatistics.points;
        }
        if ((a.teamStatistics.goalsScored - a.teamStatistics.goalsConceded) !== (b.teamStatistics.goalsScored - b.teamStatistics.goalsConceded)) {
            return (b.teamStatistics.goalsScored - b.teamStatistics.goalsConceded) - (a.teamStatistics.goalsScored - a.teamStatistics.goalsConceded);
        }
        return a.name.localeCompare(b.name);
    });

    return (
        <div>
            <table>
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
                {sortedTeams.map((team, index) => (
                    <tr key={index}>
                        <td>{index+1}.</td>
                        <td>{team.name}</td>
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
    );
}

export default TableComponent;
