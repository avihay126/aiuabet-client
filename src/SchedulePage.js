import { useEffect, useState } from "react";
import axios from "axios";
import PrintRound from "./PrintRound";
import "./Styles/PrintRoundStyle.css"

function SchedulePage() {
    const [matches, setMatches] = useState([]);
    const [selectedRound, setSelectedRound] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:9124/get-schedule")
            .then((response) => {
                let rounds = Array.from({ length: 38 }, (_, i) => i + 1)
                    .map(roundNumber => response.data.filter(match => match.round === roundNumber));
                setMatches(rounds);
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
        <div id={"Schedule-page"}>
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
    );
}

export default SchedulePage;
