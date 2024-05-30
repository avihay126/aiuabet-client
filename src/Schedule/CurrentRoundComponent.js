import React, {useEffect, useState} from "react";

import TeamGoals from "../Stat/TeamGoals";
import {
    AWAY_WIN,
    DIGITS_AFTER_POINT,
    DRAW_RESULT,
    HOME_WIN,
    IS_AWAY,
    IS_HOME,
    LOW_RATIO, MAX_PERCENT, MIN_RATIO, RATIO_DOUBLING_BY, SELECTED_MATCH_BACKGROUND,
    UN_SELECTED_MATCH_BACKGROUND
} from "../Constants/Constants";


function CurrentRoundComponent(props) {
    const { getTeamGoals } = TeamGoals();


    const getTeamRatio = (prob) => {
        let ratio = ((MAX_PERCENT - prob) / MAX_PERCENT) * RATIO_DOUBLING_BY
        if (ratio < MIN_RATIO) {
            ratio = MIN_RATIO;

        }
        return ratio.toFixed(DIGITS_AFTER_POINT);
    }



    const getBackground = (match, userBet)=>{
        for (let i = 0; i < props.bets.length; i++) {
            const currentBet = props.bets[i];
            if (currentBet.match.id == match.id && currentBet.userBet == userBet){
                return SELECTED_MATCH_BACKGROUND
            }
        }
        return UN_SELECTED_MATCH_BACKGROUND
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
                        let homeRatio = getTeamRatio(match.matchProbabilities.homeTeamWin);
                        let awayRatio = getTeamRatio(match.matchProbabilities.awayTeamWin);
                        if (homeRatio < LOW_RATIO){
                            awayRatio = parseFloat((awayRatio + 1)).toFixed(DIGITS_AFTER_POINT)
                        }
                        if (awayRatio < LOW_RATIO){
                            homeRatio = parseFloat((homeRatio+1)).toFixed(DIGITS_AFTER_POINT)
                        }
                        const drawRatio = (parseFloat(getTeamRatio(match.matchProbabilities.draw)) + 1).toFixed(DIGITS_AFTER_POINT);
                        return (
                            <tr key={index}>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => props.updateBets({match:match, userBet:HOME_WIN,ratio:homeRatio})}
                                    style={{ backgroundColor: getBackground(match, HOME_WIN) }}
                                >
                                    {match.homeTeam.name}{!props.inGame && <> - {homeRatio}</>}
                                </td>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => props.updateBets({match:match, userBet:DRAW_RESULT,ratio:drawRatio})}
                                    style={{ backgroundColor: getBackground(match, DRAW_RESULT)}}
                                >
                                    {props.inGame ? <>{getTeamGoals(match, IS_HOME)}-{getTeamGoals(match, IS_AWAY)}</> : <>{drawRatio}</>}
                                </td>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => props.updateBets({match:match, userBet:AWAY_WIN,ratio:awayRatio})}
                                    style={{ backgroundColor: getBackground(match, AWAY_WIN)}}
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
