function ValidInputSum(){

    const validInputSum = (event) =>{
        const value = event.target.value;
        if (/^\d+$/.test(value) || value === '') {
            if(value <= 10000){
                return true
            }

        }
        return false
    }

    return{validInputSum}
}

export default ValidInputSum