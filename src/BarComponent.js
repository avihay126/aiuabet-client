import { useState } from 'react';
import './Styles/BarComponent.css';
import Timer from "./Timer";
import { useNavigate } from 'react-router-dom';
import {
    HOME_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    SCHEDULE_PAGE_ROUTE,
    STAT_PAGE_ROUTE,
    TABLE_PAGE_ROUTE,
    RULES_PAGE_ROUTE
} from "./Constants/Constants"

function BarComponent({user,logOut,loggedIn, openLogin, openRegister , timer , inGame }) {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();

    const aiuaImage = require("C:\\Users\\DELL\\WebstormProjects\\aiuabet-client\\src\\Styles\\aiuabetlogo.jpg")

    const handleClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
        navigate(item)
    };

    const handleSignUpClick = () => {
        openRegister();
    };

    const handleSignInClick = () => {
        openLogin();
    };

    const handleLogOutClick = () => {
        logOut();
        navigate(HOME_PAGE_ROUTE)
    };
    const handleProfileClick = () => {
        navigate(PROFILE_PAGE_ROUTE)
    };

    return (
        <div className="bar">
            <img id={"bar-image"} onClick={() => handleClick(HOME_PAGE_ROUTE)} src={aiuaImage} alt="תמונה"/>
            <div type={"bar-part"}  id={"mainBar"} >
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
            <div type={"bar-part"} id={"secondBar"} >
                <BarItem onClick={() => handleClick(HOME_PAGE_ROUTE)} selected={selectedItem === HOME_PAGE_ROUTE}>Main</BarItem>
                <BarItem onClick={() => handleClick(STAT_PAGE_ROUTE)} selected={selectedItem === STAT_PAGE_ROUTE}>Statistics</BarItem>
                <BarItem onClick={() => handleClick(TABLE_PAGE_ROUTE)} selected={selectedItem === TABLE_PAGE_ROUTE}>Table</BarItem>
                <BarItem onClick={() => handleClick(SCHEDULE_PAGE_ROUTE)} selected={selectedItem === SCHEDULE_PAGE_ROUTE}>Schedule</BarItem>
                <BarItem onClick={() => handleClick(RULES_PAGE_ROUTE)} selected={selectedItem === RULES_PAGE_ROUTE}>GameRules</BarItem>
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
