import {INPUT_BALANCE_SIZE} from "../Constants/Constants";

function UpdateBalanceComponent({balance,updateBalance,deposit,type,withdraw}){

    return(
        <div>
            <div className={"sub-title-user-details"}>
                {type}
            </div>
            <input size={INPUT_BALANCE_SIZE} className={"input-user-details"} value={balance} onChange={(event)=>{updateBalance(event)}}/>$
            <button disabled={balance == 0} className={"button-user-details"} id={"button-deposit"} onClick={type == "DEPOSIT"?deposit:withdraw}>update</button>

        </div>
    )
}
export default UpdateBalanceComponent