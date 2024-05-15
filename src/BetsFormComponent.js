import "./Styles/BetsStyle.css"
import BetComponent from "./BetComponent";
import {useState} from "react";


function BetsFormComponent({bets}){


    const [inputSum, setInputSum] = useState(0);

    const updateInputSum = (event) =>{
        const value = event.target.value;
        if (/^\d+$/.test(value) || value === '') {
            setInputSum(value);
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
                            <BetComponent bet={bet}/>
                        )
                    })
                }

            </div>
            {
                bets.length > 0 &&
                <div>

                    <div>
                        Total win ratio: {getTotalRatio()}
                    </div>
                    <input size={1} value={inputSum}   onChange={(event)=>updateInputSum(event)}/>
                    <span>$</span>
                    {
                        inputSum != "" &&
                        <div>
                            Expected winning amount: {(getTotalRatio()*inputSum).toFixed(2)}$
                        </div>
                    }
                </div>
            }
        </div>

    )
}

export default BetsFormComponent;