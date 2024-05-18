


function BetComponent({bet, updateBets}){
    const match = bet.match
    const userBet = bet.userBet;
    const ratio= bet.ratio;

    const teamNameBet=(match,userBet)=>{
        let team = match.homeTeam.name;
        if (userBet===2){
            team = match.awayTeam.name;
        }else if(userBet===0){
            team ="Draw"
        }
        return team
    }

    return(
            <div className={"bet"}>
                <button className="close-button" onClick={()=>updateBets({match:match, userBet:userBet,ratio:ratio})} >X</button>
                <div className={"chosen-bet"}>

                    {teamNameBet(match,userBet)} - {ratio}
                </div>
                <div className={"match-bet"}>
                    {match.homeTeam.name} - {match.awayTeam.name}
                </div>
            </div>
    )
}

export default BetComponent