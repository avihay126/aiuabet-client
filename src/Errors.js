import {INCORRECT_PASSWORD, INVALID_INPUTS, USER_NOT_EXIST, USERNAME_OR_EMAIL_TAKEN} from "./Constants/Constants";

function Errors() {

    const showError = (error) => {
        let text = ""
        if (error == USERNAME_OR_EMAIL_TAKEN){
            text = "Username or Email was taken"
        }else if (error == INVALID_INPUTS){
            text = "Invalid inputs!"
        }else if(error == USER_NOT_EXIST){
            text = "User doesnt exist!"
        }else if(error == INCORRECT_PASSWORD){
            text = "Incorrect Password"
        }
        return text
    }

    return {showError}


}

export default Errors