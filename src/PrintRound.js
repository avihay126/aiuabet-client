import TeamGoals from "./TeamGoals";
import "./Styles/PrintRoundStyle.css";

function PrintRound({ round, roundNumber , id }) {
    const { getTeamGoals } = TeamGoals();

    const isTookPlace = (matches) => {
        for (let i = 0; i < matches.length; i++) {
            if (matches[i].goals.length > 0) {
                return true;
            }
        }
        return false;
    };

    return (
        <div id={id} className="print-round-container">
            <table className="print-round-table">
                <caption className="print-round-caption">Round {roundNumber}</caption>
                <thead>
                <tr>
                    <th className="print-round-th">Home</th>
                    <th className="print-round-th">Score</th>
                    <th className="print-round-th">Away</th>
                </tr>
                </thead>
                <tbody>
                {round.map((match, index) => (
                    <tr key={index} className="print-round-row">
                        <td className="print-round-td">{match.homeTeam.name}</td>
                        <td className="print-round-td">
                            {isTookPlace(round) ? (
                                <>{getTeamGoals(match, true)}-{getTeamGoals(match, false)}</>
                            ) : (
                                <span className="print-round-vs">VS</span>
                            )}
                        </td>
                        <td className="print-round-td">{match.awayTeam.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PrintRound;
