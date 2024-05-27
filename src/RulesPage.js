import React from 'react';

function RulesPage() {
    // דוגמה למערך חוקים
    const rules = [
        "You can send an unlimited number of forms in the same cycle, but it should be noted that you can bet  in each form on one result for each game.",
        "Cycle time is 90 minutes and the betting selection time is one minute.",
        "You can set the amount of the bet by selecting the result in each game and at the same time you can see the bets you have selected balloon on the right side and also the calculation of the winning amount if you win.",
        "Your winning amount consists of the multiplier of the ratios according to the games you have chosen.",
        "Pay attention! Once the gaming cycle has started it is not possible to change your betting selection, think carefully before submitting the form.",
        "Remember! The betting experience is an exciting and joyful experience, but note that it does not harm your gaming experience.",
        // ניתן להוסיף עוד חוקים לדוגמה
    ];

    // חלוקת המערך לקבוצות של 3 חוקים לכל שורה
    const rows = [];
    for (let i = 0; i < rules.length; i += 3) {
        rows.push(rules.slice(i, i + 3));
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
