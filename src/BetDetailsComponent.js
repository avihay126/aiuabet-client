import TeamGoals from "./TeamGoals";

function BetDetailsComponent(){

    const {getWinnerTeam} = TeamGoals();

    const teamNameBet=(match,userBet)=>{
        let team = match.homeTeam.name;
        if (userBet===2){
            team = match.awayTeam.name;
        }else if(userBet===0){
            team ="DRAW"
        }
        return team
    }

    const getTotalRatio = (formBets)=>{
        let ratio = 1;
        for (let i = 0; i < formBets.length; i++) {
            ratio *= formBets[i].ratio;
        }
        return ratio.toFixed(2);
    }

    const checkFormWin = (form)=>{
        for (const bet of form.bets) {
            if (teamNameBet(bet.match,bet.userBet) !== getWinnerTeam(bet.match)){
                return false
            }
        }
        return true
    }

    return {teamNameBet,getTotalRatio,checkFormWin}


}

export default BetDetailsComponent

