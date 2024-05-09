import TeamGoals from "./TeamGoals";


function PrintRound({round , roundNumber}){

    const {getTeamGoals} = TeamGoals();

    return(
        <div>
            <table>
                <caption>Round {roundNumber}</caption>
                <thead>
                    <tr>
                        <th>Home</th>
                        <th>Score</th>
                        <th>Away</th>
                    </tr>
                </thead>
                <tbody>
                {
                    round.map((match)=>{
                        return(
                            <tr>
                                <td>{match.homeTeam.name}</td>
                                <td>{getTeamGoals(match,true)}-{getTeamGoals(match,false)}</td>
                                <td>{match.awayTeam.name}</td>
                            </tr>
                        )
                    })
                }
                </tbody>

            </table>
        </div>
    )
}

export default PrintRound;