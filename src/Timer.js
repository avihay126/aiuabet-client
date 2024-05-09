import {useEffect, useState} from "react";
import "./TimerStyle.css";


function Timer({timer, inGame}){

    const [timerText,setTimerText] = useState("Round Start:")

    useEffect(()=>{
        if (inGame){
            setTimerText("Live:")
        }else {
            setTimerText("Round Start:")
        }
    },[inGame]);


    return(
        <div id={"timerContainer"}>
            <span id={inGame?"timerText-Live":"timerText-Round"}>
                {timerText}
            </span>
            <span id={"timer"} >
                {timer}'
            </span>
        </div>

    )
}
export default Timer;