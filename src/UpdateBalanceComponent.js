function UpdateBalanceComponent({balance,updateBalance,deposit,type,withdraw,user}){

    return(
        <div>
            <div className={"sub-title-user-details"}>
                {type}
            </div>
            <input size={5} className={"input-user-details"} value={balance} onChange={(event)=>{updateBalance(event)}}/>$
            <button disabled={balance == 0} className={"button-user-details"} id={"button-deposit"} onClick={type == "DEPOSIT"?deposit:withdraw}>update</button>

        </div>
    )
}
export default UpdateBalanceComponent