import React, {useEffect, useState} from "react";
import axios from "axios";
import TeamGoals from "./TeamGoals";

function CurrentRoundComponent(props) {
    const { getTeamGoals } = TeamGoals();


    const getTeamRatio = (prob) => {
        let ratio = ((100 - prob) / 100) * 4
        if (ratio < 1.05) {
            ratio = 1.05;
        }
        return ratio.toFixed(2);
    }



    const getBackground = (match, userBet)=>{
        for (let i = 0; i < props.bets.length; i++) {
            const currentBet = props.bets[i];
            if (currentBet.match.id == match.id && currentBet.userBet == userBet){
                return 'yellow'
            }
        }
        return 'transparent'
    }

    return (
        <div id={"currentRound-container"}>
            <table id={"currentRound-table"}>
                <thead>
                <tr>
                    <th>Home</th>
                    {
                        props.inGame ?
                            <th>Score</th>
                            :
                            <th>Draw</th>
                    }
                    <th>Away</th>
                </tr>
                </thead>
                <tbody>
                {
                    props.matches.map((match, index) => {
                        const homeRatio = getTeamRatio(match.matchProbabilities.homeTeamWin);
                        const awayRatio = getTeamRatio(match.matchProbabilities.awayTeamWin);
                        const drawRatio = (parseFloat(getTeamRatio(match.matchProbabilities.draw)) + 1).toFixed(2);
                        return (
                            <tr key={index}>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => props.updateBets({match:match, userBet:1,ratio:homeRatio})}
                                    style={{ backgroundColor: getBackground(match, 1) }}
                                >
                                    {match.homeTeam.name}{!props.inGame && <> - {homeRatio}</>}
                                </td>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => props.updateBets({match:match, userBet:0,ratio:drawRatio})}
                                    style={{ backgroundColor: getBackground(match, 0)}}
                                >
                                    {props.inGame ? <>{getTeamGoals(match, true)}-{getTeamGoals(match, false)}</> : <>{drawRatio}</>}
                                </td>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => props.updateBets({match:match, userBet:2,ratio:awayRatio})}
                                    style={{ backgroundColor: getBackground(match, 2)}}
                                >
                                    {!props.inGame && <>{awayRatio} - </>}{match.awayTeam.name}
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>

        </div>
    )
}

export default CurrentRoundComponent;
