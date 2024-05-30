import React, { useState } from 'react';
import BetDetailsComponent from "./BetDetailsComponent";
import TeamGoals from "../Stat/TeamGoals";
import {IS_AWAY, IS_HOME, LOSE, WIN} from "../Constants/Constants";

function BetHistory({ forms,type,matches,id,setForms,title}) {

    const [openFormId, setOpenFormId] = useState(null);
    const {teamNameBet,getTotalRatio,checkFormWin} = BetDetailsComponent();
    const {getWinnerTeam,getTeamGoals} = TeamGoals()


    const handleRowClick = (id) => {

        if (openFormId === id) {
            setOpenFormId(null);
        } else {
            setOpenFormId(id);
        }
    };

    const getBetMatch = (bet)=>{
        for (const match of matches) {
            if (match.id == bet.match.id){
                return match
            }
        }
        return null
    }

    const updateFormWin =(form) =>{
        for (const bet of form.bets) {
            const match = getBetMatch(bet)
            if (match == null){
                setForms([])
                break
            }
            if (teamNameBet(match,bet.userBet) !== getWinnerTeam(match)){
                return false
            }
        }
        return true
    }



    return (
        <div type={"scroller"} id={id}>
            <div className={"user-bet-title"}>
                {title}
            </div>
            <table id="bet-history-table">
                <thead>
                <tr>
                    <th>ID</th>
                    {type? <th>ROUND</th>: "" }
                    <th>AMOUNT</th>
                    <th>RATIO</th>
                    <th>STATUS</th>
                </tr>
                </thead>
                <tbody>
                {
                    forms.map((form) => (
                        <React.Fragment key={form.id}>
                            <tr key={form.id} className="table-bets-row" onClick={() => handleRowClick(form.id)}>
                                <td>{form.id}</td>
                                {type? <td>{form.round}</td>: "" }
                                <td>{form.moneyBet}</td>
                                <td>{getTotalRatio(form.bets)}</td>
                                {
                                    type?
                                        <td>{checkFormWin(form)? WIN:LOSE}</td>
                                        :
                                        <td>{updateFormWin(form)? WIN:LOSE}</td>
                                }

                            </tr>
                            {

                                form.id === openFormId &&
                                <tr className={"inner-container-bets"}>
                                    <td id={"table-bets-container"} colSpan="5">
                                        <table id={"inner-table-bets"}>
                                            <thead>
                                            <tr>
                                                <th></th>
                                                <th>MATCH</th>
                                                <th>BET</th>
                                                <th>RATIO</th>
                                                <th>WINNER</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {form.bets.map((bet,index) => (
                                                <tr key={bet.id}>
                                                    <td>{index+1}</td>
                                                    {
                                                        type?
                                                            <td>{bet.match.homeTeam.name} - {bet.match.awayTeam.name}</td>
                                                            :
                                                            <td>{bet.match.homeTeam.name} {getTeamGoals(getBetMatch(bet),IS_HOME)} - {getTeamGoals(getBetMatch(bet),IS_AWAY)} {bet.match.awayTeam.name}</td>
                                                    }
                                                    <td>{teamNameBet(bet.match,bet.userBet)}</td>
                                                    <td>{bet.ratio}</td>
                                                    {
                                                        type?
                                                            <td>{getWinnerTeam(bet.match)}</td>
                                                            :
                                                            <td>{getWinnerTeam(getBetMatch(bet))} </td>
                                                    }

                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            }
                        </React.Fragment>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default BetHistory;
