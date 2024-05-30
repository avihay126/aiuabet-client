import React, {useState} from "react";
import BetDetailsComponent from "./BetDetailsComponent";
import {LOSE, WIN} from "../Constants/Constants";

function CurrentRoundForms({currentForms}){

    const [openFormId, setOpenFormId] = useState(null);
    const {teamNameBet,getTotalRatio,checkFormWin} = BetDetailsComponent();

    const handleRowClick = (id) => {

        if (openFormId === id) {
            setOpenFormId(null);
        } else {
            setOpenFormId(id);
        }
    };

    return(

        <div id={"current-forms-container"}>
            <table>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>AMOUNT</th>
                    <th>RATIO</th>
                    <th>STATUS</th>
                </tr>
                </thead>
                <tbody>
                {
                    currentForms.map((form)=>{
                        return(
                            <tr className="table-bets-row" onClick={() => handleRowClick(form.id)}>
                                <td>{form.id}</td>
                                <td>{form.moneyBet}</td>
                                <td>{getTotalRatio(form.bets)}</td>
                                <td>{checkFormWin(form)? WIN:LOSE}</td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    )
}

export default CurrentRoundForms