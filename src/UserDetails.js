import PrintUserDetails from "./PrintUserDetails";
import {useState} from "react";
import ValidInputSum from "./ValidInputSum";
import axios from "axios";
import UpdateBalanceComponent from "./UpdateBalanceComponent";
import UpdateUserDetailsComponent from "./UpdateUserDetailsComponent";

function UserDetails({user,updateState}){

    const [depositClicked,setDepositClicked] = useState(false)
    const [withdrawClicked,setWithdrawClicked] = useState(false)
    const [detailsClicked,setDetailsClicked] = useState(false)
    const [balance,setBalance] = useState(0)
    const [message,setMessage] = useState("");
    const {validInputSum} = ValidInputSum();

    const handleDepositClicked =()=>{
        setDepositClicked(!depositClicked)
        setDetailsClicked(false)
        setWithdrawClicked(false)
    }

    const handleWithdrawClicked =()=>{
        setWithdrawClicked(!withdrawClicked)
        setDepositClicked(false)
        setDetailsClicked(false)

    }
    const handleDetailsClicked =()=>{
        setDetailsClicked(!detailsClicked)
        setDepositClicked(false)
        setWithdrawClicked(false)

    }

    const updateBalance =(event)=>{
        if (validInputSum(event)){
            setBalance(event.target.value)
        }
    }

    const deposit = ()=>{
        axios.post("http://localhost:9124/deposit-user-balance?balance="+balance).then((response)=>{
            updateState("user",response.data)

            handleMessage("BALANCE UPDATED SUCCESSFULLY!")
        })
    }

    const withdraw = ()=>{
        axios.post("http://localhost:9124/withdraw-user-balance?balance="+balance).then((response)=>{
            if (response.data.balance == user.balance){
                handleMessage("YOU HAVE NO ENOUGH MONEY!")
            }else {
                updateState("user",response.data)
                handleMessage("BALANCE UPDATED SUCCESSFULLY!")
            }

        })
    }

    const handleMessage =(text)=>{
        setMessage(text)
        setBalance(0)
        setDepositClicked(false)
        setDetailsClicked(false)
        setWithdrawClicked(false)
        setTimeout(()=>{
            setMessage("")
        },1000)
    }


    return(
        <div id={"user-details-container"}>
            <div className={"sub-details"} type={"show-details"}>
                <PrintUserDetails user={user}/>
            </div>
            <button className={"button-user-details"} id={"deposit-balance"} onClick={handleDepositClicked}>DEPOSIT</button>
            <button className={"button-user-details"} id={"withdraw-balance"} onClick={handleWithdrawClicked}>WITHDRAW</button>
            <button className={"button-user-details"} id={"update-details"} onClick={handleDetailsClicked}>UPDATE DETAILS</button>
            <div className={"sub-details"} type={"update-details"}>
                <div style={{fontWeight:"bold"}}>
                    {message}
                </div>
                {
                    depositClicked &&
                    <UpdateBalanceComponent balance={balance} user={user} type={"DEPOSIT"} deposit={deposit} updateBalance={updateBalance}/>
                }
                {
                    withdrawClicked &&
                    <UpdateBalanceComponent balance={balance} user={user} type={"WITHDRAW"} withdraw={withdraw} updateBalance={updateBalance}/>

                }
                {
                    detailsClicked &&
                    <UpdateUserDetailsComponent setMessage={handleMessage} user={user}  updateState={updateState}/>
                }
            </div>
        </div>
    )
}

export default UserDetails;