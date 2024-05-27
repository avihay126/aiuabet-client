import {useState} from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import UserValidInputs from "./UserValidInputs";
import "./Styles/SignDashboard.css";


function RegisterDashboard(props){

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [error,setError] = useState(-1)
    const {correctInputs} = UserValidInputs();




    const register = () =>{
        debugger;
        axios.post("http://localhost:9124/register", undefined,{
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

    const showError = () => {
      let text = ""
      if (error == 4){
          text = "Username or Email was taken"
      }else if (error == 5){
          text = "Invalid inputs!"
      }
      return text
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

            </div>



        </div>
    )


}
export default RegisterDashboard;