import axios from 'axios';
import React from 'react';
import BattleCard from './BattleCard';
import BattleMessages from './BattleMessages';
import MoveBar from './MoveBar';
import SwitchingCard from './SwitchingCard';
import MoveService from '../services/MoveService';



class Battler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: ["1", "2", "3", "4"],
            turn: 0,
            winner: null,
            userTeam: {},
            userPokemon: [],
            userCurrentPokemon: {},
            enemyTeam: {},
            enemyPokemon: [],
            enemyCurrentPokemon: {},
            switching: false,
            userMove1: {},
            userMove2: {},
            userMove3: {},
            userMove4: {},
            isLoading: true,
            movesLoaded: false,
            switchOccured: true
        };
        this.setData = this.setData.bind(this);
        this.showState = this.showState.bind(this);
        this.initSwitch = this.initSwitch.bind(this);
        this.setUserCurrentPokemon = this.setUserCurrentPokemon.bind(this);
        this.setEnemyCurrentPokemon = this.setEnemyCurrentPokemon.bind(this);
        this.cancelSwitching = this.cancelSwitching.bind(this);
        this.selectSet = this.selectSet.bind(this);
        this.getUserMoveData = this.getUserMoveData.bind(this);
        this.setMovesLoaded = this.setMovesLoaded.bind(this);
        this.useMove = this.useMove.bind(this);
        this.userUseMove = this.userUseMove.bind(this);
    }

    initSwitch() {
        this.setState({ switching: true })
    }

    cancelSwitching() {
        this.setState({ switching: false })
        this.setState({ isLoading: true })
    }


    handleFirstTurn() {
        let cynthFirstPoke = Math.floor(Math.random() * (this.state.enemyPokemon.length));
        this.setEnemyCurrentPokemon(cynthFirstPoke);
        this.setState({ switching: true });
        this.setState({ turn: this.state.turn + 1 })
    }

    useMove(move, user, target) {

    }

    getUserMoveData() {
        const baseUrl = `http://localhost:8084/api/v1/move/`;
        let url;
        url = baseUrl + this.state.userCurrentPokemon.move1;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove1: res.data[0] })
        });
        url = baseUrl + this.state.userCurrentPokemon.move2;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove2: res.data[0] })
        });
        url = baseUrl + this.state.userCurrentPokemon.move3;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove3: res.data[0] })
        });
        url = baseUrl + this.state.userCurrentPokemon.move4;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove4: res.data[0] })
        });
    }


    //Damage = ((((2 * Level / 5 + 2) * AttackStat * AttackPower / DefenseStat) / 50) + 2) * STAB * Weakness/Resistance * RandomNumber / 100 for later
    calculateDamage(user, move, target) {
        console.log(user)
        let attackStat, defenseStat;
        let stab = 1
        //stab = Same type attack bonus
        if (move.type === user.type1.toLowerCase()) {
            stab = 1.5
        }
        else if (user.hasOwnProperty("type2") === true) {
            if (move.type === user.type2.toLowerCase()) {
                stab = 1.5
            }
        }

        //get the damage for type matchups
        let typeDmgMultiplier = MoveService.getTypeMultiplier(move.type, target.type1)
        if (target.hasOwnProperty("type2") === true && target.type2 !== null) {
            typeDmgMultiplier = typeDmgMultiplier * MoveService.getTypeMultiplier(move.type, target.type2)
        }
        console.log("done with typeDmg: " + typeDmgMultiplier)
        //random num between 85 and 100
        let RandomNumber = Math.floor(Math.random() * 16) + 85
        if (move.damage_class.toLowerCase() === "physical") {
            attackStat = user.attack;
            defenseStat = target.defense;
            console.log("physcial move")
        }
        else if (move.damage_class.toLowerCase() === "special") {
            attackStat = user.spAttack;
            defenseStat = target.spDefense;
            console.log("special move")
        }
        else {
            alert("this move has not been implemented yet.")
            attackStat = 1;
            defenseStat = 1;
        }

        return ((((2 * 100 / 5 + 2) * attackStat * move.power / defenseStat) / 50) + 2) * stab * typeDmgMultiplier * RandomNumber / 100;
    }

    userUseMove(slot) {
        switch (slot) {
            case 1:
                console.log(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove1, this.state.enemyCurrentPokemon))
                break;
            case 2:
                console.log(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove2, this.state.enemyCurrentPokemon))
                break;
            case 3:
                console.log(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove3, this.state.enemyCurrentPokemon))
                break;
            case 4:
                console.log(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove3, this.state.enemyCurrentPokemon))
                break;
        }
        console.log(slot)
    }

    useMove(isUserTarget, damage) {
        if (isUserTarget) {

        }
        else {

        }
    }






    handleTurn() {
        this.setState({ isLoading: true })
        if (this.state.switching === true) {
            this.setState({ switching: false })
        }
        this.setState({ turn: this.state.turn + 1 })
    }

    sleep = (milliseconds) => {
        return new Promise(resolve => setTimeout(resolve, milliseconds))
    }

    setData() {
        this.setState({ userTeam: this.props.userTeam });
        this.setState({ enemyTeam: this.props.enemyTeam });
        this.setState({ userPokemon: this.props.userPokemon });
        this.setState({ enemyPokemon: this.props.enemyPokemon });
    }


    setUserCurrentPokemon(pkmnSlot) {
        console.log(pkmnSlot)
        let current = {};
        let newCurrent;
        if (this.state.userCurrentPokemon !== {}) {
            current = this.state.userCurrentPokemon;
        }
        let array = this.state.userPokemon;
        if (current !== {}) {
            newCurrent = array.splice(pkmnSlot, 1)
            newCurrent = newCurrent[0]
            array.push(current)
        }
        else {
            console.log("here")
            newCurrent = array.splice(pkmnSlot, 1, current)
        }
        this.setState({ isLoading: true })
        this.setState({ userCurrentPokemon: newCurrent })
        this.setState({ userPokemon: array })
        this.setState({ movesLoaded: false })
        this.setState({ switchOccured: true })
        this.handleTurn();
    }


    setEnemyCurrentPokemon(pkmnSlot) {
        let current = {};
        let newCurrent;
        if (this.state.enemyCurrentPokemon !== {}) {
            current = this.state.enemyCurrentPokemon;
        }
        let array = this.state.enemyPokemon;
        if (current !== {}) {
            newCurrent = array.splice(pkmnSlot, 1)
            newCurrent = newCurrent[0]
        }
        else {
            console.log("here")
            newCurrent = array.splice(pkmnSlot, 1, current)
        }
        this.setState({ enemyCurrentPokemon: newCurrent })
        this.setState({ enemyPokemon: array })

    }



    showState() {
        console.log(this.state)
    }

    componentDidMount() {
        this.setData();
    }

    isEnemyPokeListLoading() {
        if (this.state.enemyPokemon === []) {
            return true
        }
        else return false;
    }

    isEnemyPokemonLoading() {
        if (this.isEnemyPokeListLoading === true) return true;
        if (this.state.enemyCurrentPokemon === {}) return true;
        return false;
    }


    setMovesLoaded() {
        if (this.state.movesLoaded !== true) {
            this.setState({ isLoading: true })
            this.setState({ movesLoaded: true })
        }
        else {
            this.setState({ movesLoaded: true })
        }
    }

    selectSet(slot) {
        this.setUserCurrentPokemon(slot);
        this.setState({ movesLoaded: false })
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.state.switchOccured === true) {
            this.setState({ switchOccured: false });
        }

        if (this.state.turn == 0) {
            this.handleFirstTurn();
        }
        else if (this.state.isLoading === true) {
            this.setState({ isLoading: false })
            this.getUserMoveData();
        }


    }

    render() {

        if (this.state.isLoading === true) {
            return (
                <h1 onClick={this.showState}>Not Loaded</h1>
            );
        }
        else {
            return (
                <div>
                    <BattleCard name={this.state.enemyTeam.name} pokemon={this.state.enemyCurrentPokemon} back={false} className='enemy' style={{ justifyContent: "flex-end" }} />
                    <BattleMessages messages={this.state.messages} />
                    {this.state.switching ? <SwitchingCard pokemon={this.state.userPokemon} cancelSwitching={this.cancelSwitching} setCurrentPokemon={this.setUserCurrentPokemon} name={this.state.userTeam.name} clickHandler={this.selectSet} /> :
                        <BattleCard name={this.state.userTeam.name} pokemon={this.state.userCurrentPokemon} back={true} id='user' />}
                    {this.state.switching ? <div /> : <MoveBar moves={[this.state.userMove1, this.state.userMove2, this.state.userMove3, this.state.userMove4]} initSwitch={this.initSwitch} cancelSwitching={this.cancelSwitching} setMovesLoaded={this.setMovesLoaded} isSwitching={this.state.switching} useMove={this.userUseMove} />}
                </div>
            );
        }

    }



}



export default Battler;