function TeamGoals(){


    const getTeamGoals = (match,home) =>{
        let homeGoals = 0
        let awayGoals = 0
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

 return {getTeamGoals}
}
export default TeamGoals;