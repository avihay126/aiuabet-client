import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import MyBetsComponent from "./MyBetsComponent";
import UserDetails from "./UserDetails";

function MyProfile({checkCookies,user,updateState,matches,time}){

    const navigate = useNavigate();


    useEffect(()=>{
        checkCookies();
        debugger
        if (user == null){
            navigate("/")
        }
    },[])


    return(
        <div>
            <div className={"page-title"}>
                MY PROFILE
            </div>
            <MyBetsComponent matches={matches} time={time}/>
            <UserDetails updateState={updateState} user={user}/>
        </div>
    )
}

export default MyProfile;