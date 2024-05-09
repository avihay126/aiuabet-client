function UserValidInputs(){

    const correctEmail = (email) =>{
        return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)
    }
    const correctPassword = (password) =>{
        return password.length>=8 && /[A-Z]/.test(password.charAt(0)) && /\d/.test(password)
    }

    return{correctEmail,correctPassword};

}

export default UserValidInputs;