import { useState } from 'react';
import './Styles/BarComponent.css';
import Timer from "./Timer"; // import the CSS file
import { useNavigate } from 'react-router-dom';

function BarComponent({user,logOut,loggedIn, openLogin, openRegister , timer , inGame }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const aiuaImage = require("C:\\Users\\DELL\\WebstormProjects\\aiuabet-client\\src\\Styles\\aiuabetlogo.jpg")

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

    const handleLogOutClick = () => {
        logOut();
        navigate("/")
    };
    const handleProfileClick = () => {
        navigate("/MyProfile")
    };

    return (
        <div className="bar">
            <img src={aiuaImage} alt="תמונה"/>
            <div  id={"mainBar"} >
                {
                    loggedIn ?
                        (<div>
                            <button className="userDetails" onClick={()=>handleProfileClick()}>{user.username[0]}</button>
                            <button className="buttonLog" onClick={()=>handleLogOutClick()} >Log Out</button>
                        </div>)
                        :
                        (<div>
                            <button className="buttonLog" onClick={handleSignUpClick} >Sign Up</button>
                            <button className="buttonLog" onClick={handleSignInClick}>Sign In</button>
                        </div>)
                }

            </div>
            <div id={"secondBar"} >
                <BarItem onClick={() => handleClick("")} selected={selectedItem === ""}>Main</BarItem>
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
