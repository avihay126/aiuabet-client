import '../Styles/TablePageStyle.css';

function PrintTeamPlayers({players}){
    return(

            <table  className={"teamPlayers"}>
                <caption>Players</caption>
                <tbody>
                {
                    players.map((player,index)=>{
                        return(
                            <tr>
                                <td>
                                    {index+1}. {player.fullName}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>

            </table>

    )
}

export default PrintTeamPlayers;