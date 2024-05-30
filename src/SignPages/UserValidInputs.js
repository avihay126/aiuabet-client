import {PASSWORD_MIN_SIZE, USERNAME_MIN_SIZE} from "../Constants/Constants";

function UserValidInputs(){

    const correctEmail = (email) =>{
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    }
    const correctPassword = (password) =>{
        return password.length>=PASSWORD_MIN_SIZE && /[A-Z]/.test(password.charAt(0)) && /\d/.test(password)
    }

    const correctUsername = (username) =>{
        return username.length>=USERNAME_MIN_SIZE && /[A-Z]/.test(username.charAt(0))
    }
    const correctInputs = (email,password,username)=>{
        return correctUsername(username) && correctEmail(email) &&correctPassword(password)
    }

    return{correctEmail,correctPassword,correctUsername,correctInputs};

}

export default UserValidInputs;