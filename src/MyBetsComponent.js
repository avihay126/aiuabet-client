import "./Styles/ProfileStyle.css"
import {useEffect, useState} from "react";
import axios from "axios";
import BetHistory from "./BetHistory";
import CurrentRoundForms from "./CurrentRoundForms";

function MyBetsComponent({matches,time}){

    const [myForms,setMyForms] = useState([])
    const [currentRoundForms,setCurrentRoundForms] = useState([])

    useEffect(()=>{

            axios.get("http://localhost:9124/get-user-bet-history-forms")
                .then((response)=>{
                    setMyForms(response.data)
                })
            axios.get("http://localhost:9124/get-user-bet-current-forms")
                .then((response)=>{
                    setCurrentRoundForms(response.data)
                })

    },[time])

    return(
        <div id={"my-bets-container"}>
            <BetHistory forms={myForms} type={true} matches={matches} id={"bet-history-container"}/>
            <BetHistory forms={currentRoundForms} type={false} matches={matches} id={"current-forms-container"} setForms={setCurrentRoundForms}/>
        </div>
    )
}

export default MyBetsComponent;
