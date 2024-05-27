import "./Styles/BetsStyle.css"
import BetComponent from "./BetComponent";
import {useState} from "react";
import axios from "axios";
import ValidInputSum from "./ValidInputSum";
import BetDetailsComponent from "./BetDetailsComponent";


function BetsFormComponent({bets ,updateBets, loggedIn, inGame,user,updateState}){


    const [inputSum, setInputSum] = useState(0);
    const {validInputSum} = ValidInputSum();
    const {getTotalRatio} = BetDetailsComponent();




    const updateInputSum = (event) =>{
        if (validInputSum(event)){
            setInputSum(event.target.value)
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
                        Total win ratio: {getTotalRatio(bets)}
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
                            Expected winning: {(getTotalRatio(bets)*inputSum).toFixed(2)}$
                        </div>
                    }
                </div>
            }
        </div>

    )
}

export default BetsFormComponent;