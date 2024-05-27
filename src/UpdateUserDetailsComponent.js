import React, {useState} from 'react';
import axios from 'axios';
import UserValidInputs from "./UserValidInputs";

function UpdateUserDetailsComponent({user, updateState,setMessage}) {
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [newPassword, setNewPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const {correctInputs,correctPassword} = UserValidInputs();

    const handleUpdate = () => {
            debugger;
            axios.post('http://localhost:9124/update-user-details',undefined,{
                params:{
                    username: username,
                    email: email,
                    newPassword: newPassword,
                    currentPassword: currentPassword
                },
            }).then((response) => {
                debugger
                    if(response.data.success){
                        updateState('user', response.data.user);
                        setMessage("USER DETAILS UPDATED SUCCESSFULLY")
                    }else if (response.data.errorCode == 3) {
                        setMessage("INVALID PASSWORD!")
                    }else if (response.data.errorCode == 4){
                        setMessage("USERNAME OR EMAIL ALREADY TAKEN")
                    }



                });

    };

    return (
        <div id={"table-input-details-container"}>
            <table id={"table-input-details"}>
                <thead>
                <tr>
                    <td>
                        USERNAME
                    </td>
                    <td>
                        EMAIL
                    </td>
                    <td>
                        PASSWORD
                    </td>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>
                        <input className={"input-user-details"} type="text" value={username}
                               onChange={e => setUsername(e.target.value)} placeholder="Username"/>
                    </td>
                    <td>
                        <input className={"input-user-details"} type="email" value={email}
                               onChange={e => setEmail(e.target.value)} placeholder="Email"/>
                    </td>
                    <td>
                        <input className={"input-user-details"} type="password" value={newPassword}
                               onChange={e => setNewPassword(e.target.value)} placeholder="New Password"/>
                    </td>
                </tr>
                </tbody>
            </table>


            <input className={"input-user-details"} type="password" value={currentPassword}
                   onChange={e => setCurrentPassword(e.target.value)} placeholder="Current Password"/>
            <button id={"update-user-details"} className={"button-user-details"} disabled={!(correctInputs(email,newPassword,username) && correctPassword(currentPassword))} onClick={handleUpdate}>Update Details</button>
        </div>
    );
}

export default UpdateUserDetailsComponent;
