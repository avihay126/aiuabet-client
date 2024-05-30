import "../Styles/ProfileStyle.css"
import {useEffect, useState} from "react";
import axios from "axios";
import BetHistory from "../Bets/BetHistory";
import CurrentRoundForms from "../Bets/CurrentRoundForms";
import {API_URL, CURRENT_BETS, HISTORY_BETS} from "../Constants/Constants";

function MyBetsComponent({matches,time}){

    const [myForms,setMyForms] = useState([])
    const [currentRoundForms,setCurrentRoundForms] = useState([])

    useEffect(()=>{
            getHistoryBets()
            getCurrentBets()
    },[])


    useEffect(()=>{
        if (time == 60){
            getHistoryBets()
            getCurrentBets()
        }
    },[time])

    const getHistoryBets =() =>{
        axios.get(API_URL+"get-user-bet-history-forms")
            .then((response)=>{
                setMyForms(response.data)
            })
    }

    const getCurrentBets =() =>{
        axios.get(API_URL+"get-user-bet-current-forms")
            .then((response)=>{
                setCurrentRoundForms(response.data)
            })
    }



    return(
        <div id={"my-bets-container"}>
            <BetHistory forms={myForms} type={HISTORY_BETS} matches={matches} id={"bet-history-container"} title={"HISTORY BETS"}/>
            <BetHistory forms={currentRoundForms} type={CURRENT_BETS} matches={matches} id={"current-forms-container"} setForms={setCurrentRoundForms} title={"CURRENT BETS"}/>
        </div>
    )
}

export default MyBetsComponent;
