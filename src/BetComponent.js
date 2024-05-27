import BetDetailsComponent from "./BetDetailsComponent";


function BetComponent({bet, updateBets}){
    const match = bet.match
    const userBet = bet.userBet;
    const ratio= bet.ratio;

    const {teamNameBet} = BetDetailsComponent()



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