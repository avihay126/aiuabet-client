import './App.css';
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

axios.defaults.withCredentials = true

class App extends React.Component {
    state = {
        time: 0,
        inGame: false,
        loggedIn: false,
        currentRound:[],
        teams: [],
        isLoginOpen: false,
        isRegisterOpen: false
    };

    setSecret =(secret) =>{
        const cookies = new Cookies(null, {path:'/'});
        cookies.set('secret',secret);
        this.updateState("loggedIn", true)
    }

    checkCookies = () =>{
        const cookies = new Cookies(null, {path:'/'});
        for (const cookiesKey in cookies.getAll()) {
            if (cookiesKey == "secret"){
                const secret = cookies.get("secret")
                this.updateState("loggedIn", true)
            }
        }
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



    updateState = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    deleteCookies =() =>{
        const cookies = new Cookies(null, {path:'/'});
        cookies.remove("secret")
        this.updateState("loggedIn", false)
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <BarComponent openLogin={this.openLogin} openRegister={this.openRegister} timer={this.state.time} inGame={this.state.inGame}/>
                    {this.state.isLoginOpen && <LoginDashboard closeLogIn={this.closeLogin} />}
                    {this.state.isRegisterOpen && <RegisterDashboard closeRegister = {this.closeRegister} />}

                        <Routes>
                            <Route path={"/Table"} element={<TableComponent teams={this.state.teams}/>}/>
                            <Route path={"/Schedule"} element={<SchedulePage/>}/>
                        </Routes>
                </BrowserRouter>
            </div>


        );
    }
}

export default App;
