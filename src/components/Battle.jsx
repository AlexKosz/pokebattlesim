import axios from 'axios';
import React from 'react';
import TrainerCard from './TrainerCard';
import Battler from './Battler';
import { Redirect } from 'react-router'


class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            userTeamId: 0,
            userTeam: {},
            userPokemon: [],
            enemyTeam: {},
            enemyPokemon: [],
            loading: true,
            battleStarted: false,
            winner: null,
            isLoading: true,
            victorious: false
        };
        this.beginBattle = this.beginBattle.bind(this);
        this.getCynthia = this.getCynthia.bind(this);
        this.handleLoss = this.handleLoss.bind(this);
        this.handleVictory = this.handleVictory.bind(this);


    }

    getNewestTeam() {
        let PkmnUrl = `http://localhost:8084/api/v1/newestTeamPkmn`
        axios.get(PkmnUrl).then(res => {
            this.setState({ userPokemon: res.data })
        });
        let TeamUrl = `http://localhost:8084/api/v1/newestTeam`
        axios.get(TeamUrl).then(res => {
            this.setState({ userTeam: res.data })
            this.setState({ userTeamId: res.data.id })
        });
    }

    getCynthia() {
        let PkmnUrl = `http://localhost:8084/api/v1/team/3`
        axios.get(PkmnUrl).then(res => {
            this.setState({ enemyPokemon: res.data })
            console.log("here")
        });
        let TeamUrl = `http://localhost:8084/api/v1/teamInfo/3`
        axios.get(TeamUrl).then(res => {
            this.setState({ enemyTeam: res.data })
        });
    }

    beginBattle() {
        this.setState({ battleStarted: true })
    }

    handleLoss() {
        alert("You lost... try again?")
        this.getCynthia();
        this.getNewestTeam();
        this.setState({ battleStarted: false })
        this.setState({ isLoading: true })
    }

    handleVictory() {
        console.log("teststing");
        this.setState({ victorious: true })
        // let setVictoriousUrl = `http://localhost:8084/api/v1/team/victorious/${this.state.userTeamId}`
        // axios.post(setVictoriousUrl).then(res => {

        // });
    }

    componentDidMount() {
        if (this.state.userTeamId === 0) {
            this.getNewestTeam();
        }
        else {
            let TeamUrl = `http://localhost:8084/api/v1/team/${this.state.userTeamId}`
            axios.get(TeamUrl).then(res => {
                this.setState({ userTeam: res.data })
            });
        }
        this.getCynthia();
    }

    componentDidUpdate() {
        if (this.state.userPokemon.length !== 0 &&
            this.state.userTeam !== {} &&
            this.state.enemyPokemon.length !== 0 &&
            this.state.enemyTeam !== {} &&
            this.state.isLoading === true) {
            this.setState({ isLoading: false })
        }
    }

    render() {
        if (this.state.victorious === true) {
            return <Redirect to="/" noThrow />
        }

        if (this.state.isLoading === true) {
            return (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            );
        }
        else {
            if (this.state.battleStarted !== true) {
                return (
                    <div className="loaded">
                        <div className="trainerCardBattleUser">
                            <TrainerCard trainer={this.state.userTeam} pokemon={this.state.userPokemon} />
                        </div>
                        <h1>VS</h1>
                        <div className="trainerCardBattleEnemy">
                            <TrainerCard trainer={this.state.enemyTeam} pokemon={this.state.enemyPokemon} />
                        </div>
                        <h1 className="clickable" onClick={this.beginBattle}>Click here to begin battle!</h1>
                    </div >
                );

            }
            else {
                return (
                    <div className="battle">
                        <Battler userTeam={this.state.userTeam} userPokemon={this.state.userPokemon} enemyTeam={this.state.enemyTeam} enemyPokemon={this.state.enemyPokemon} handleLoss={this.handleLoss} handleVictory={this.handleVictory} />
                    </div>
                );
            }



        }


    }
}



export default Battle;