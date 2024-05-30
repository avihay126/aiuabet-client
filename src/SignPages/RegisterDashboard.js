import React, {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import UserValidInputs from "./UserValidInputs";
import "../Styles/SignDashboard.css";
import Errors from "../Errors";
import Tooltip from "../Tooltip";
import {API_URL} from "../Constants/Constants";


function RegisterDashboard(props){

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(-1)
    const {correctInputs} = UserValidInputs();
    const {showError} = Errors();



    const register = () =>{
        debugger;
        axios.post(API_URL+"register", undefined,{
            params:{
                username: username,
                email: email,
                password: password
            },
        }).then((response)=>{
            if (response.data.success){
                props.setSecret(response.data.user.secret);
                handleClose()
            }else {
                setError(response.data.errorCode)
                setUsername("")
                setEmail("")
                setPassword("")
            }
        })
    }



    const handleClose = () => {
        props.closeRegister();
    };


    return(
        <div className="log-popup">
            <div>
                <button className="close-button" onClick={handleClose}>X</button>
                <h2>Sign Up</h2>
                <input placeholder={"Username"} value={username} onChange={(event) => {setUsername(event.target.value)}}/>
                <input placeholder={"Email"} type={"email"} value={email} onChange={(event) => {setEmail(event.target.value)}}/>
                <input placeholder={"Password"}  type={"password"} value={password} onChange={(event) => {setPassword(event.target.value)}}/>
                <button className={"logButton"} onClick={register} disabled={!correctInputs(email,password,username)}>Sign Up</button>
                {showError(error)}
                <div>
                    <Tooltip text="Username: Starts with a capital letter. Min length -- 5.
Password: starts with a capital letter, must contain at least one digit. Min length -- 8.">
                        <p>(?)</p>
                    </Tooltip>
                </div>
            </div>



        </div>
    )


}
export default RegisterDashboard;