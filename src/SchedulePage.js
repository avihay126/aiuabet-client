import {useEffect, useState} from "react";
import axios from "axios";
import PrintRound from "./PrintRound";


function SchedulePage(){


    const [matches,setMatches] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9124/get-schedule",undefined)
            .then((response)=>{
                debugger
                let rounds = [];
                for (let i = 0; i < 38; i++) {
                    let currentRound = [];
                    for (let j = 0; j < response.data.length; j++) {
                        if(response.data[j].round == i+1){
                            currentRound.push(response.data[j])
                        }
                    }
                    rounds.push(currentRound);
                }
            setMatches(rounds);
        })

    },[])


    return(
        <div>
            SchedulePage
            {
                matches.map((round,index)=>{
                    return(
                        <PrintRound round={round} roundNumber={index+1}/>
                    )
                })
            }

        </div>
    )
}

export default SchedulePage;