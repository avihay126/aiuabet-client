import "./Styles/StatisticsPage.css"
import TopScorer from "./TopScorer";
import {useEffect, useState} from "react";
import axios from "axios";
import MiniTableComponent from "./MiniTableComponent";

function StatisticsPage({teams}){


    const [homeMatches, setHomeMatches] = useState([])
    const [awayMatches, setAwayMatches] = useState([])

    useEffect(()=>{
        axios.get("http://localhost:9124/get-team-home-away?home="+true).then((response)=>{
            setHomeMatches(response.data)
        })

        axios.get("http://localhost:9124/get-team-home-away?home="+false).then((response)=>{
            debugger
            setAwayMatches(response.data)
        })
    },[])
    return(
        <div id={"stat-container"}>
            <div className={"page-title"}>
                STATISTICS
            </div>
            <div id={"topScorer-title"} className={"table-type-title"}> TOP SCORER</div>
            <TopScorer/>
            <div id={"home-table-title"} className={"table-type-title"}>
                HOME TABLE
            </div>
            <div className={"home-table"}>

                {
                    homeMatches.length > 0 &&
                    <MiniTableComponent teams={homeMatches}/>
                }

            </div>
            <div id={"away-table-title"} className={"table-type-title"}>
                AWAY TABLE
            </div>
            <div className={"away-table"}>

                {
                    awayMatches.length > 0 &&
                    <MiniTableComponent teams={awayMatches}/>
                }

            </div>



        </div>
    )
}

export default StatisticsPage