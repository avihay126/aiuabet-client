import React from 'react';
import './Styles/Restart.css';
import {API_URL, HOME_PAGE_ROUTE} from "./Constants/Constants";
import axios from "axios";


function Restart() {
    const handleRestart = () => {
        axios.get(API_URL+"restart").then((response)=>{

        })
    };

    const aiuaImage = require("./Styles/aiuabetlogo.jpg")

    return (
        <div className="restart-container">
            <p>START NEW SEASON?</p>
            <button onClick={handleRestart}>Restart</button>
            <img id={"restart-image"}  src={aiuaImage} alt="תמונה"/>
        </div>
    );
}

export default Restart;
