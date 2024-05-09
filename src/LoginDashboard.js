import { useState } from "react";
import axios from "axios";
import RegisterDashboard from "./RegisterDashboard";
import UserValidInputs from "./UserValidInputs";
import "./SignDashboard.css"; // קובץ ה-CSS החיצוני

function LoginDashboard(props){

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(-1);
    const {correctPassword, correctEmail} = UserValidInputs();

    const login = () => {
        axios.post("http://localhost:9124/login", undefined,{
            params:{
                email: email,
                password: password
            },
        }).then((response)=>{
            if (response.data.success){
                props.setSecret(response.data.secret)
            }else {
                setPassword("")
                setEmail("")
                setError(response.data.errorCode)
            }
        });
    };

    const handleClose = () => {
        props.closeLogIn();
    };

    return(
        <div className="log-popup">
            <div>
                <button className="close-button" onClick={handleClose}>X</button>
                <h2>Sign In</h2>
                <input type={"email"} value={email} onChange={(event) =>{setEmail(event.target.value)}} placeholder="Email"/>
                <input type={"password"} value={password} onChange={(event) =>{setPassword(event.target.value)}} placeholder="Password"/>
                <button className={"logButton"} onClick={login} disabled={!(correctEmail(email)&&correctPassword(password))}>Sign In</button>
            </div>
        </div>
    );
}

export default LoginDashboard;
