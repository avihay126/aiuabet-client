import React, { useState } from 'react';
import BetDetailsComponent from "./BetDetailsComponent";
import TeamGoals from "./TeamGoals";

function BetHistory({ forms,type,matches,id,setForms}) {

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
        <div id={id}>
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
                        <>
                            <tr className="table-bets-row" onClick={() => handleRowClick(form.id)}>
                                <td>{form.id}</td>
                                {type? <td>{form.round}</td>: "" }
                                <td>{form.moneyBet}</td>
                                <td>{getTotalRatio(form.bets)}</td>
                                {
                                    type?
                                        <td>{checkFormWin(form)? "W":"L"}</td>
                                        :
                                        <td>{updateFormWin(form)? "W":"L"}</td>
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
                                            {/* הדפסת רשימת ההימורים כאן */}
                                            {form.bets.map((bet,index) => (
                                                <tr key={bet.id}>
                                                    <td>{index+1}</td>
                                                    {
                                                        type?
                                                            <td>{bet.match.homeTeam.name} - {bet.match.awayTeam.name}</td>
                                                            :
                                                            <td>{bet.match.homeTeam.name} {getTeamGoals(getBetMatch(bet),true)} - {getTeamGoals(getBetMatch(bet),false)} {bet.match.awayTeam.name}</td>
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
                        </>
                    ))
                }
                </tbody>
            </table>
        </div>
    );
}

export default BetHistory;
