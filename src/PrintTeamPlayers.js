import './Styles/TablePageStyle.css';

function PrintTeamPlayers({players}){
    return(
        <div>
            <table className={"teamPlayers"}>
                <caption>Players</caption>
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
            </table>
        </div>
    )
}

export default PrintTeamPlayers;