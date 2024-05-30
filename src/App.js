import './Styles/App.css';
import React from "react";
import RegisterDashboard from "./SignPages/RegisterDashboard";
import Timer from "./Timer";
import axios from "axios";
import Cookies from "universal-cookie";
import LoginDashboard from "./SignPages/LoginDashboard";
import CurrentRoundComponent from "./Schedule/CurrentRoundComponent";
import TableComponent from "./TABLES/TableComponent";
import BarComponent from "./BarComponent";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import SchedulePage from "./Schedule/SchedulePage";
import HomePage from "./HomePage";
import RulesPage from "./RulesPage";
import StatisticsPage from "./Stat/StatisticsPage";
import MyProfile from "./User/MyProfile";
import NotFoundPage from "./NotFoundPage";
import Tooltip from "./Tooltip";
import {
    API_URL,
    MAX_MINUTE,
    HOME_PAGE_ROUTE,
    DEFAULT_PAGE,
    TABLE_PAGE_ROUTE,
    SCHEDULE_PAGE_ROUTE,
    RULES_PAGE_ROUTE,
    STAT_PAGE_ROUTE,
    PROFILE_PAGE_ROUTE,
    MAX_ROUND
} from "./Constants/Constants"
import Restart from "./Restart";
import PrintWaiting from "./PrintWaiting";


axios.defaults.withCredentials = true

class App extends React.Component {
    state = {
        time: 0,
        user: null,
        inGame: false,
        loggedIn: false,
        currentRound: [],
        teams: [],
        isLoginOpen: false,
        isRegisterOpen: false,
        bets: [],
        roundNumber: 1,
        pageLoaded: false
    };


    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.time == MAX_MINUTE && prevState.time != this.state.time) {
            axios.get(API_URL+"get-bets-result")
                .then((response) => {
                    this.setState({
                        user: response.data
                    })
                })
        }

        if (this.state.time == 0 && this.state.inGame && this.state.bets.length > 0) {
            this.setState({
                bets: []
            })
        }
    }

    setSecret = (secret) => {
        const cookies = new Cookies(null, {path: '/'});
        cookies.set('secret', secret);
        this.getUserBySecret()
    }

    checkCookies = () => {
        const cookies = new Cookies(null, {path: '/'});
        for (const cookiesKey in cookies.getAll()) {
            if (cookiesKey == "secret") {
                const secret = cookies.get("secret")
                this.getUserBySecret();
            }
        }
    }

    getUserBySecret = () => {
        axios.get(API_URL+"login-by-secret")
            .then((response) => {
                this.setState({
                    user: response.data,
                    loggedIn: true
                })
            })
    }

    componentDidMount() {

        this.checkCookies()
        const event = new EventSource(API_URL+"start-streaming");
        event.onerror =()=>{
            console.log("error")
        }
        event.onopen = () => {
            console.log('Connection is open,', event.readyState);
        };
        event.onmessage = (message) => {
            const update = JSON.parse(message.data);
            this.setState({
                time: update.time,
                inGame: update.inGame,
                currentRound: update.round,
                teams: update.teams,
                roundNumber: update.roundNumber,
                pageLoaded: true
            });
            if (this.state.time == MAX_MINUTE) {
                this.setState({
                    bets: []
                })

            }
        };
    }

    openLogin = () => {
        this.setState({isLoginOpen: true});
        this.closeRegister();
    };

    closeLogin = () => {
        this.setState({isLoginOpen: false});
    };

    openRegister = () => {
        this.setState({isRegisterOpen: true});
        this.closeLogin();
    };

    closeRegister = () => {
        this.setState({isRegisterOpen: false});
    };
    closeLogs = () => {
        this.closeRegister();
        this.closeLogin();
    }

    updateBets = (bet) => {
        let exist = false
        if (!this.state.inGame) {
            for (let i = 0; i < this.state.bets.length; i++) {
                let currentBet = this.state.bets[i];
                if (currentBet.match.id === bet.match.id && currentBet.userBet === bet.userBet) {
                    this.setState(prevState => ({
                        bets: prevState.bets.filter(bet2 => !(bet2.match.id === bet.match.id && bet2.userBet === bet.userBet))
                    }));
                    exist = true

                } else if (currentBet.match.id === bet.match.id) {
                    this.setState(prevState => ({
                        bets: prevState.bets.filter(bet2 => !(bet2.match.id === currentBet.match.id && bet2.userBet === currentBet.userBet))
                    }));
                    break
                }
            }
            if (!exist) {
                this.setState(prevState => ({
                    bets: [...prevState.bets, bet]
                }))
            }
        }


    }


    updateState = (key, value) => {
        this.setState({
            [key]: value
        });
    };

    deleteCookies = () => {
        const cookies = new Cookies(null, {path: '/'});
        cookies.remove("secret")
        this.updateState("loggedIn", false)
        this.updateState("user", null)
    }


    render() {
        return (
            <div className="App">
                {
                    !this.state.pageLoaded?
                        <div>
                            <PrintWaiting/>
                        </div>
                        :
                        <div className="App">
                            {
                                this.state.roundNumber == MAX_ROUND +1?
                                    <div>
                                        <Restart/>
                                    </div>
                                    :
                                    <BrowserRouter>
                                        <BarComponent user={this.state.user} logOut={this.deleteCookies} loggedIn={this.state.loggedIn}
                                                      openLogin={this.openLogin} openRegister={this.openRegister} timer={this.state.time}
                                                      inGame={this.state.inGame}/>
                                        {this.state.isLoginOpen &&
                                            <LoginDashboard setSecret={this.setSecret} closeLogIn={this.closeLogin}/>}
                                        {this.state.isRegisterOpen &&
                                            <RegisterDashboard setSecret={this.setSecret} closeRegister={this.closeRegister}/>}

                                        <Routes>
                                            <Route path={TABLE_PAGE_ROUTE} element={<TableComponent teams={this.state.teams}/>}/>
                                            <Route path={SCHEDULE_PAGE_ROUTE} element={<SchedulePage/>}/>
                                            <Route path={HOME_PAGE_ROUTE} element={<HomePage teams={this.state.teams}
                                                                                             updateState={this.updateState}
                                                                                             user={this.state.user}
                                                                                             inGame={this.state.inGame}
                                                                                             loggedIn={this.state.loggedIn}
                                                                                             bets={this.state.bets}
                                                                                             updateBets={this.updateBets}
                                                                                             matches={this.state.currentRound}
                                                                                             inGame={this.state.inGame}/>}/>
                                            <Route path={RULES_PAGE_ROUTE} element={<RulesPage/>}/>
                                            <Route path={STAT_PAGE_ROUTE} element={<StatisticsPage teams={this.state.teams}/>}/>
                                            {
                                                this.state.loggedIn &&
                                                <Route path={PROFILE_PAGE_ROUTE}
                                                       element={<MyProfile time={this.state.time} matches={this.state.currentRound}
                                                                           updateState={this.updateState} checkCookies={this.checkCookies}
                                                                           user={this.state.user}/>}/>
                                            }

                                            <Route path={DEFAULT_PAGE} element={<NotFoundPage/>}/>

                                        </Routes>
                                    </BrowserRouter>
                            }

                        </div>

                }


            </div>


        );
    }
}

export default App;
