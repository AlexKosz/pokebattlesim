import axios from 'axios';
import React from 'react';
import TrainerCard from './TrainerCard';
import Battler from './Battler';



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
            battleStarted: false
        };
        this.beginBattle = this.beginBattle.bind(this);
        this.getCynthia = this.getCynthia.bind(this);


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

    isLoading() {
        if (this.state.userPokemon.length === 0) return true;
        if (this.state.userTeam === {}) return true;
        if (this.state.enemyPokemon.length === 0) return true;
        if (this.state.enemyTeam === {}) return true;
        return false;

    }

    componentDidMount() {
        this.getNewestTeam();
        this.getCynthia();
    }

    render() {
        if (this.isLoading()) {
            return (
                <div className="loading">
                    <h1>Loading...</h1>
                </div>
            );
        }



        else {
            if (!this.state.battleStarted) {
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
                        <Battler userTeam={this.state.userTeam} userPokemon={this.state.userPokemon} enemyTeam={this.state.enemyTeam} enemyPokemon={this.state.enemyPokemon} />
                    </div>
                );
            }



        }


    }
}



export default Battle;