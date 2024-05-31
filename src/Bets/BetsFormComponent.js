import "../Styles/BetsStyle.css"
import BetComponent from "./BetComponent";
import {useState} from "react";
import axios from "axios";
import ValidInputSum from "./ValidInputSum";
import BetDetailsComponent from "./BetDetailsComponent";
import {API_URL, DELAY_TIME, DIGITS_AFTER_POINT, MIN_BET} from "../Constants/Constants";


function BetsFormComponent({bets ,updateBets, loggedIn, inGame,user,updateState}){


    const [inputSum, setInputSum] = useState(0);
    const {validInputSum} = ValidInputSum();
    const {getTotalRatio} = BetDetailsComponent();
    const [message, setMessage] = useState("");




    const updateInputSum = (event) =>{
        if (validInputSum(event)){
            setInputSum(event.target.value)
        }
    }
    const handleButtonDisabled =() =>{
        return !loggedIn || inputSum < MIN_BET || inGame
    }

    const sendBet =()=>{
        if (user.balance >= inputSum){
            axios.post(API_URL+"get-user-bet", {
                ownerSecret: user.secret,
                bets: bets,
                moneyBet:inputSum,
                round: bets[0].match.round
            })
                .then((response)=>{
                    if(response.data.success){
                        setInputSum(0);
                        updateState("user",response.data.user);
                        updateState("bets",[])
                        handleMessage("Form has been sent successfully!")
                    }else {
                        handleMessage("You have no enough money!")
                    }
            })
        }else {
            handleMessage("You have no enough money!")
            updateState("bets",[])
        }

    }

    const handleMessage =(text)=>{
        setMessage(text)
        setTimeout(()=>{
            setMessage("")
        },DELAY_TIME)
    }






    return(
        <div type={"table-container"} id={"main-bets-container"}>
            <div type={"scroller"} id={"bets-container"}>
                <h3>YOUR BETS</h3>
                {
                    bets.map((bet)=>{

                        return(
                            <BetComponent key={bet.id} bet={bet} updateBets={updateBets}/>

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
                            Expected winning: {(getTotalRatio(bets)*inputSum).toFixed(DIGITS_AFTER_POINT)}$
                        </div>
                    }
                </div>
            }
            {message}
        </div>

    )
}

export default BetsFormComponent;