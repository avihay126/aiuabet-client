import {IS_AWAY, IS_HOME} from "../Constants/Constants";

function TeamGoals(){


    const getTeamGoals = (match,home) =>{
        debugger
        let homeGoals = 0
        let awayGoals = 0
        if (match !== null){
            for (let i = 0; i < match.goals.length; i++) {
                let goal = match.goals[i]
                if (goal.home){
                    homeGoals++;
                }else {
                    awayGoals++;
                }
            }
            if (home){
                return homeGoals
            }
            return awayGoals
        }
        return 0

    }


    const getWinnerTeam = (match)=>{
        if (match !== null){
            const homeGoals = getTeamGoals(match,IS_HOME)
            const awayGoals = getTeamGoals(match,IS_AWAY)
            if (homeGoals>awayGoals){
                return match.homeTeam.name
            }else if (awayGoals>homeGoals){
                return match.awayTeam.name
            }
            return "DRAW"
        }
        return "DRAW"

    }

 return {getTeamGoals,getWinnerTeam}
}
export default TeamGoals;