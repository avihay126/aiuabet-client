import TeamGoals from "../Stat/TeamGoals";
import {AWAY_WIN, DIGITS_AFTER_POINT, DRAW_RESULT} from "../Constants/Constants";

function BetDetailsComponent(){

    const {getWinnerTeam} = TeamGoals();

    const teamNameBet=(match,userBet)=>{
        let team = match.homeTeam.name;
        if (userBet===AWAY_WIN){
            team = match.awayTeam.name;
        }else if(userBet===DRAW_RESULT){
            team ="DRAW"
        }
        return team
    }

    const getTotalRatio = (formBets)=>{
        let ratio = 1;
        for (let i = 0; i < formBets.length; i++) {
            ratio *= formBets[i].ratio;
        }
        return ratio.toFixed(DIGITS_AFTER_POINT);
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

