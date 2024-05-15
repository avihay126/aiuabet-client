import React, {useEffect, useState} from "react";
import axios from "axios";
import TeamGoals from "./TeamGoals";

function CurrentRoundComponent(props) {
    const { getTeamGoals } = TeamGoals();
    const [clickedCells, setClickedCells] = useState(new Set());



    useEffect(() => {

        const savedClickedCells = localStorage.getItem('clickedCells');
        if (savedClickedCells) {
            if (props.bets.length == 0){
                setClickedCells(new Set())
            }else {
                setClickedCells(new Set(JSON.parse(savedClickedCells)));
            }
        }
    }, []);

    useEffect(() => {

        localStorage.setItem('clickedCells', JSON.stringify(Array.from(clickedCells)));
    }, [clickedCells]);

    const getTeamRatio = (prob) => {
        let ratio = ((100 - prob) / 100) * 4
        if (ratio < 1.05) {
            ratio = 1.05;
        }
        return ratio.toFixed(2);
    }

    const updateBet = (match, userBet, ratio) => {
        if (!props.inGame) {
            const bet = {
                match: match,
                userBet: userBet,
                ratio: ratio
            }
            props.updateBets(bet)
        }
    }

    const handleCellClick = (match, userBet, ratio,rowNum) => {
        const cellId = `${match.id}-${userBet}`;
        let bet ={
            cellId: cellId,
            rowNum: rowNum
        }
        for (const cell of clickedCells) {
            if (cell.cellId === cellId ){
                const newClickedCells = new Set(clickedCells);
                newClickedCells.delete(cell);
                setClickedCells(newClickedCells);
                break
            }else if(cell.rowNum === rowNum) {

                const newClickedCells = new Set(clickedCells);
                newClickedCells.delete(cell);
                setClickedCells(newClickedCells.add(bet));
                break
            }
            else {
                setClickedCells(new Set(clickedCells).add(bet));
            }
        }
        if (clickedCells.size == 0){
            setClickedCells(new Set(clickedCells).add(bet));
        }


            // אם התא לא לחוץ עדיין, נוסיף אותו לרשימה של התאים הלחוצים
        // לעדכן את ההימור
        updateBet(match, userBet, ratio);
    }

    const getBackground = (match, userBet)=>{

        const cellId = `${match.id}-${userBet}`;
        for (const cell of clickedCells) {
            if (cell.cellId === cellId){
                return 'red'
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
                                    onClick={() => handleCellClick(match, 1, homeRatio,index)}
                                    style={{ backgroundColor: getBackground(match, 1) }}
                                >
                                    {match.homeTeam.name}{!props.inGame && <> - {homeRatio}</>}
                                </td>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => handleCellClick(match, 0, drawRatio,index)}
                                    style={{ backgroundColor: getBackground(match, 0)}}
                                >
                                    {props.inGame ? <>{getTeamGoals(match, true)}-{getTeamGoals(match, false)}</> : <>{drawRatio}</>}
                                </td>
                                <td
                                    className={!props.inGame ? "ratios" : "inGame"}
                                    onClick={() => handleCellClick(match, 2, awayRatio,index)}
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
