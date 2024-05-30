import React from 'react';
import {RULES, RULES_IN_ROW} from "./Constants/Constants";

function RulesPage() {

    const rules = RULES;


    const rows = [];
    for (let i = 0; i < rules.length; i += RULES_IN_ROW) {
        rows.push(rules.slice(i, i + RULES_IN_ROW));
    }

    return (
        <div id={"rules-page-container"}>
            <div className={"page-title"}>GAME RULES</div>
            <div className={"rules-subTitle"}>
                Hello our friend!<br />
                You must read the betting rules before using the site
            </div>
            <div className={"rules-endTitle"}>
                <div id={"punchline"}>
                    "If you don't send how will you take?"
                </div>
                <div>
                    Bet safely and carefully for success
                </div>
            </div>
            <div className={"rules-container"}>
                <table id={"table-rules"}>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            {row.map((rule, idx) => (
                                <td className={"rule"} key={idx}>{rule}</td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RulesPage;
