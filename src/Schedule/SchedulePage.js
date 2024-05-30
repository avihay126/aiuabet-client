import { useEffect, useState } from "react";
import axios from "axios";
import PrintRound from "./PrintRound";
import "../Styles/PrintRoundStyle.css"
import {API_URL, MAX_ROUND} from "../Constants/Constants";
import PrintWaiting from "../PrintWaiting";

function SchedulePage() {
    const [matches, setMatches] = useState([]);
    const [selectedRound, setSelectedRound] = useState(1);
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        axios.get(API_URL+"get-schedule")
            .then((response) => {
                let rounds = Array.from({ length: MAX_ROUND }, (_, i) => i + 1)
                    .map(roundNumber => response.data.filter(match => match.round === roundNumber));
                setMatches(rounds);
                setLoader(true)
            })
            .catch(error => console.error("Error fetching schedule:", error));
    }, []);

    const handleRoundChange = (e) => {
        setSelectedRound(parseInt(e.target.value));
        document.getElementById(`round-${e.target.value}`).scrollIntoView({ behavior: 'smooth' });
    };

    const scrollToTop = () => {
        document.getElementById(`select-box`).scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div>
            {
                !loader?
                    <div>
                        <PrintWaiting/>
                    </div>
                    :
                    <div type={"scroller"} id={"Schedule-page"}>
                        <select id={"select-box"} value={selectedRound} onChange={handleRoundChange}>
                            {Array.from({ length: matches.length }, (_, i) => i + 1).map(roundNumber => (
                                <option key={roundNumber} value={roundNumber}>Round {roundNumber}</option>
                            ))}
                        </select>
                        {
                            matches.map((round, index) => (
                                <PrintRound key={index} round={round} roundNumber={index + 1} id={`round-${index + 1}`} />
                            ))
                        }
                        <button className="scroll-to-top" onClick={scrollToTop}>^</button>
                    </div>
            }
        </div>
    );
}

export default SchedulePage;
