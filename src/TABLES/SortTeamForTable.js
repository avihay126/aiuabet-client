


function SortTeamForTable(){
    function sortTeams(teams) {
        const sortedTeams = [...teams].sort((a, b) => {
            if (a.teamStatistics.points !== b.teamStatistics.points) {
                return b.teamStatistics.points - a.teamStatistics.points;
            }
            if ((a.teamStatistics.goalsScored - a.teamStatistics.goalsConceded) !== (b.teamStatistics.goalsScored - b.teamStatistics.goalsConceded)) {
                return (b.teamStatistics.goalsScored - b.teamStatistics.goalsConceded) - (a.teamStatistics.goalsScored - a.teamStatistics.goalsConceded);
            }
            return a.name.localeCompare(b.name);
        });

        return sortedTeams;
    }

    return {sortTeams}
}
export default SortTeamForTable