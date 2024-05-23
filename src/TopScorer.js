import {useEffect, useState} from "react";
import axios from "axios";


function TopScorer(){

    const [players,setPlayers] = useState([]);

    useEffect(()=>{
        axios.get("http://localhost:9124/get-top-scorer").then((response)=>{
            setPlayers(response.data);
        })
    },[])

    return(
        <div className={"topScorer-container"}>

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