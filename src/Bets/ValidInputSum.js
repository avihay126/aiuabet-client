import {MAX_BET_SUM} from "../Constants/Constants";

function ValidInputSum(){

    const validInputSum = (event) =>{
        const value = event.target.value;
        if (/^\d+$/.test(value) || value === '') {
            if(value <= MAX_BET_SUM){
                return true
            }

        }
        return false
    }

    return{validInputSum}
}

export default ValidInputSum