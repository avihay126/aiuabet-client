import "../Styles/StatisticsPage.css"
import TopScorer from "./TopScorer";
import {useEffect, useState} from "react";
import axios from "axios";
import MiniTableComponent from "../TABLES/MiniTableComponent";
import {API_URL, IS_AWAY, IS_HOME} from "../Constants/Constants";
import PrintWaiting from "../PrintWaiting";

function StatisticsPage({teams}){


    const [homeMatches, setHomeMatches] = useState([])
    const [awayMatches, setAwayMatches] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(()=>{
        axios.get(API_URL + "get-team-home-away?home="+IS_HOME).then((response)=>{
            setHomeMatches(response.data)
        })

        axios.get(API_URL+ "/get-team-home-away?home="+IS_AWAY).then((response)=>{
            setAwayMatches(response.data)
            setLoader(true)

        })


    },[])
    return(
        <div >
            {
                !loader?
                    <div>
                        <PrintWaiting/>
                    </div>
                    :
                    <div id={"stat-container"}>
                        <div className={"page-title"}>
                            STATISTICS
                        </div>
                        <div id={"topScorer-title"} className={"table-type-title"}> TOP SCORER</div>
                        <TopScorer/>
                        <div id={"home-table-title"} className={"table-type-title"}>
                            HOME TABLE
                        </div>
                        <div type={"table-container"} className={"home-table"}>

                            {
                                homeMatches.length > 0 &&
                                <MiniTableComponent teams={homeMatches}/>
                            }

                        </div>
                        <div id={"away-table-title"} className={"table-type-title"}>
                            AWAY TABLE
                        </div>
                        <div type={"table-container"} className={"away-table"}>

                            {
                                awayMatches.length > 0 &&
                                <MiniTableComponent teams={awayMatches}/>
                            }

                        </div>
                    </div>
            }
        </div>
    )
}

export default StatisticsPage