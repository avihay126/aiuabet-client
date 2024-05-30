import {useEffect, useState} from "react";
import axios from "axios";
import {API_URL} from "../Constants/Constants";


function TopScorer(props){

    const [players,setPlayers] = useState([]);

    useEffect(()=>{
        axios.get(API_URL+"get-top-scorer").then((response)=>{
            setPlayers(response.data);

        })
    },[])

    return(
        <div type={"table-container"} className={"topScorer-container"}>

            {
                players.length > 0 &&
                <table id={"topScorer-table"}>
                    <thead>
                        <tr>
                            <th>
                                P.
                            </th>
                            <th>
                                Name
                            </th>
                            <th>
                                Goals
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                    {players.map((player,index)=>{
                        return(
                            <tr>
                                <td>
                                    {index+1}.
                                </td>
                                <td>
                                    {player.fullName}
                                </td>
                                <td>
                                    {player.goals.length}
                                </td>
                            </tr>

                        )
                    })}
                    </tbody>
                </table>
            }

        </div>
    )
}

export default TopScorer;