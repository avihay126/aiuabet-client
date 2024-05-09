import { useState } from 'react';
import './BarComponent.css';
import Timer from "./Timer"; // import the CSS file
import { useNavigate } from 'react-router-dom';

function BarComponent({ openLogin, openRegister , timer , inGame }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const handleClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
        navigate(`/${item}`)
    };

    const handleSignUpClick = () => {
        openRegister();
    };

    const handleSignInClick = () => {
        openLogin();
    };

    return (
        <div className="bar">
            <div  id={"mainBar"} >
                <button className="buttonLog" onClick={handleSignUpClick} >Sign Up</button>
                <button className="buttonLog" onClick={handleSignInClick}>Sign In</button>
            </div>
            <div id={"secondBar"} >
                <BarItem onClick={() => handleClick("Main")} selected={selectedItem === "Main"}>Main</BarItem>
                <BarItem onClick={() => handleClick("Statistics")} selected={selectedItem === "Statistics"}>Statistics</BarItem>
                <BarItem onClick={() => handleClick("Table")} selected={selectedItem === "Table"}>Table</BarItem>
                <BarItem onClick={() => handleClick("Schedule")} selected={selectedItem === "Schedule"}>Schedule</BarItem>
                <BarItem onClick={() => handleClick("GameRules")} selected={selectedItem === "GameRules"}>GameRules</BarItem>
            </div>
            <Timer timer={timer} inGame={inGame}/>
        </div>
    );
}

function BarItem({ children, onClick, selected }) {
    return (
        <div onClick={onClick} className={`item ${selected ? 'selected' : ''}`}>
            {children}
        </div>
    );
}

export default BarComponent;
