import "./Styles/BetsStyle.css"
import BetComponent from "./BetComponent";
import {useState} from "react";
import axios from "axios";


function BetsFormComponent({bets ,updateBets, loggedIn, inGame,user,updateState}){


    const [inputSum, setInputSum] = useState(0);



    const updateInputSum = (event) =>{
        const value = event.target.value;
        if (/^\d+$/.test(value) || value === '') {
            if(value <= 10000){
                setInputSum(value);
            }

        }
    }
    const handleButtonDisabled =() =>{
        return !loggedIn || inputSum < 10 || inGame
    }

    const sendBet =()=>{

        if (user.balance >= inputSum){
            axios.post("http://localhost:9124/get-user-bet", {
                ownerSecret: user.secret,
                bets: bets,
                moneyBet:inputSum,
                round: bets[0].match.round
            })
                .then((response)=>{
                    if(response.data.success){
                        debugger
                        setInputSum(0);
                        updateState("user",response.data.user);
                        updateState("bets",[])
                    }else {
                        alert("You have no enough money")
                    }
            })
        }else {
            alert("You have no enough money")
            updateState("bets",[])
        }

    }



    const getTotalRatio = ()=>{
        let ratio = 1;
        for (let i = 0; i < bets.length; i++) {
            ratio *= bets[i].ratio;
        }
        return ratio.toFixed(2);
    }


    return(
        <div id={"main-bets-container"}>
            <div id={"bets-container"}>
                <h3>YOUR BETS</h3>
                {
                    bets.map((bet)=>{

                        return(
                            <BetComponent bet={bet} updateBets={updateBets}/>

                        )
                    })
                }

            </div>
            {
                bets.length > 0 &&
                <div id={"bet-summary"}>
                    <div id={"total-ratio"}>
                        Total win ratio: {getTotalRatio()}
                    </div>
                    <div>
                        <input  id={"bet-input"} disabled={inGame} size={1} value={inputSum}   onChange={(event)=>updateInputSum(event)}/>$
                        <button id={"bet-button"} disabled={handleButtonDisabled()} onClick={()=>sendBet()} >BET</button>
                        {
                            !loggedIn && <>sign for bet</>
                        }
                    </div>


                    {
                        inputSum != "" &&
                        <div>
                            Expected winning: {(getTotalRatio()*inputSum).toFixed(2)}$
                        </div>
                    }
                </div>
            }
        </div>

    )
}

export default BetsFormComponent;