import './Styles/App.css';
import React from "react";
import RegisterDashboard from "./RegisterDashboard";
import Timer from "./Timer";
import axios from "axios";
import Cookies from "universal-cookie";
import LoginDashboard from "./LoginDashboard";
import CurrentRoundComponent from "./CurrentRoundComponent";
import TableComponent from "./TableComponent";
import BarComponent from "./BarComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SchedulePage from "./SchedulePage";
import HomePage from "./HomePage";

axios.defaults.withCredentials = true

class App extends React.Component {
    state = {
        time: 0,
        user:null,
        inGame: false,
        loggedIn: false,
        currentRound:[],
        teams: [],
        isLoginOpen: false,
        isRegisterOpen: false,
        bets:[]
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.time == 90 && prevState.time != this.state.time){
            axios.get("http://localhost:9124/get-bets-result")
                .then((response)=>{
                    this.setState({
                        user: response.data
                    })
                })
        }

        if (this.state.time == 0 && this.state.inGame && this.state.bets.length >0){
            this.setState({
                bets:[]
            })
        }
    }

    setSecret  = (secret) =>{
        const cookies = new Cookies(null, {path:'/'});
        cookies.set('secret',secret);
        this.getUserBySecret()
    }

    checkCookies = () =>{
        const cookies = new Cookies(null, {path:'/'});
        for (const cookiesKey in cookies.getAll()) {
            if (cookiesKey == "secret"){
                const secret = cookies.get("secret")
                this.getUserBySecret();
            }
        }
    }

    getUserBySecret = ()  =>{
       axios.get("http://localhost:9124/login-by-secret")
            .then((response)=>{
               this.setState({
                    user:response.data,
                    loggedIn: true
                })
            })
    }

    componentDidMount() {

        this.checkCookies()
        const event = new EventSource("http://localhost:9124/start-streaming");
        event.onopen = () => {
            console.log('Connection is open,', event.readyState);
        };
        event.onmessage = (message) => {
            const update = JSON.parse(message.data);
            this.setState({
                time: update.time,
                inGame:update.inGame,
                currentRound: update.round,
                teams: update.teams
            });
            if (this.state.time == 90){
                this.setState({
                    bets:[]
                })

            }
        };
    }

    openLogin = () => {
        this.setState({ isLoginOpen: true });
        this.closeRegister();
    };

    closeLogin = () => {
        this.setState({ isLoginOpen: false });
    };

    openRegister = () => {
        this.setState({ isRegisterOpen: true });
        this.closeLogin();
    };

    closeRegister = () => {
        this.setState({ isRegisterOpen: false });
    };
    closeLogs =() =>{
        this.closeRegister();
        this.closeLogin();
    }

    updateBets =(bet)=>{
        let exist = false
        if (!this.state.inGame){
            for (let i = 0; i < this.state.bets.length; i++) {
                let currentBet = this.state.bets[i];
                if (currentBet.match.id === bet.match.id && currentBet.userBet === bet.userBet){
                    this.setState(prevState => ({
                        bets: prevState.bets.filter(bet2 => !(bet2.match.id === bet.match.id && bet2.userBet === bet.userBet))
                    }));
                    exist = true

                }else if (currentBet.match.id === bet.match.id){
                    this.setState(prevState => ({
                        bets: prevState.bets.filter(bet2 => !(bet2.match.id === currentBet.match.id && bet2.userBet === currentBet.userBet))
                    }));
                    break
                }
            }
            if (!exist){
                this.setState(prevState=>({
                    bets: [...prevState.bets,bet]
                }))
            }
        }


    }



    updateState = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    deleteCookies =() =>{
        const cookies = new Cookies(null, {path:'/'});
        cookies.remove("secret")
        this.updateState("loggedIn", false)
        this.updateState("user", null)
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <BarComponent user={this.state.user} logOut={this.deleteCookies} loggedIn={this.state.loggedIn} openLogin={this.openLogin} openRegister={this.openRegister} timer={this.state.time} inGame={this.state.inGame}/>
                    {this.state.isLoginOpen && <LoginDashboard setSecret={this.setSecret} closeLogIn={this.closeLogin} />}
                    {this.state.isRegisterOpen && <RegisterDashboard setSecret={this.setSecret} closeRegister = {this.closeRegister} />}

                        <Routes>
                            <Route path={"/Table"} element={<TableComponent teams={this.state.teams}/>}/>
                            <Route path={"/Schedule"} element={<SchedulePage/>}/>
                            <Route path={"/"} element={<HomePage teams={this.state.teams} updateState={this.updateState} user={this.state.user} inGame={this.state.inGame} loggedIn={this.state.loggedIn} bets={this.state.bets} updateBets={this.updateBets} matches={this.state.currentRound} inGame={this.state.inGame}/>}/>
                        </Routes>
                </BrowserRouter>
            </div>


        );
    }
}

export default App;
