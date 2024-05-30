import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import MyBetsComponent from "./MyBetsComponent";
import UserDetails from "./UserDetails";
import {HOME_PAGE_ROUTE} from "../Constants/Constants";

function MyProfile({checkCookies,user,updateState,matches,time}){

    const navigate = useNavigate();


    useEffect(()=>{
        checkCookies();
        debugger
        if (user == null){
            navigate(HOME_PAGE_ROUTE)
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