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
            messages: ["", "", "", ""],
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
            enemyMove1: {},
            enemyMove2: {},
            enemyMove3: {},
            enemyMove4: {},
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
        this.getEnemyMoveData = this.getEnemyMoveData.bind(this);
        this.setMovesLoaded = this.setMovesLoaded.bind(this);
        this.useMove = this.useMove.bind(this);
        this.userUseMove = this.userUseMove.bind(this);
        this.handleTurnBattle = this.handleTurnBattle.bind(this);
        this.handleTurnSwitch = this.handleTurnSwitch.bind(this);
        this.handleMessages = this.handleMessages.bind(this);
    }

    initSwitch() {
        this.setState({ switching: true })
    }

    cancelSwitching() {
        this.setState({ switching: false })
        this.setState({ isLoading: true })
    }


    handleMessages(newMessage) {
        let messages = this.state.messages;
        messages.shift();
        messages.push(newMessage)
        this.setState({ messages: messages })
    }

    handleFirstTurn() {
        let cynthFirstPoke = Math.floor(Math.random() * (this.state.enemyPokemon.length));
        this.setEnemyCurrentPokemon(cynthFirstPoke);
        this.setState({ switching: true });
        this.setState({ turn: this.state.turn + 1 })
    }




    //Damage = ((((2 * Level / 5 + 2) * AttackStat * AttackPower / DefenseStat) / 50) + 2) * STAB * Weakness/Resistance * RandomNumber / 100 for later
    calculateDamage(user, move, target) {
        let attackStat, defenseStat;
        let stab = 1
        //stab = Same type attack bonus
        if (move.type === user.type1.toLowerCase()) {
            stab = 1.5
        }
        else if (user.hasOwnProperty("type2") === true && user.type2 !== null) {
            if (move.type === user.type2.toLowerCase()) {
                stab = 1.5
            }
        }

        //get the damage for type matchups

        let typeDmgMultiplier = MoveService.getTypeMultiplier(move.type, target.type1)
        if (target.hasOwnProperty("type2") === true && target.type2 !== null) {
            typeDmgMultiplier = typeDmgMultiplier * MoveService.getTypeMultiplier(move.type, target.type2)
        }

        //random num between 85 and 100
        let RandomNumber = Math.floor(Math.random() * 16) + 85
        if (move.damage_class.toLowerCase() === "physical") {
            attackStat = user.attack;
            defenseStat = target.defense;

        }
        else if (move.damage_class.toLowerCase() === "special") {
            attackStat = user.spAttack;
            defenseStat = target.spDefense;

        }
        else {
            alert("this move has not been implemented yet.")
            attackStat = 1;
            defenseStat = 1;
        }

        return Math.floor(((((2 * 100 / 5 + 2) * attackStat * move.power / defenseStat) / 50) + 2) * stab * typeDmgMultiplier * RandomNumber / 100);
    }

    userUseMove(slot) {
        switch (slot) {
            case 1:
                this.handleMessages(`You selected ${this.state.userMove1.name}`)
                this.handleTurnBattle(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove1, this.state.enemyCurrentPokemon))

                break;
            case 2:
                this.handleMessages(`You used ${this.state.userMove2.name}`)
                this.handleTurnBattle(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove2, this.state.enemyCurrentPokemon))
                break;
            case 3:
                this.handleMessages(`You used ${this.state.userMove3.name}`)
                this.handleTurnBattle(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove3, this.state.enemyCurrentPokemon))
                break;
            case 4:
                this.handleMessages(`You used ${this.state.userMove4.name}`)
                this.handleTurnBattle(this.calculateDamage(this.state.userCurrentPokemon, this.state.userMove3, this.state.enemyCurrentPokemon))
                break;
            default:
                break;
        }

    }

    useMove(isUserTarget, damage) {

        if (isUserTarget === true) {
            let pokemon = this.state.userCurrentPokemon;
            if (pokemon.hasOwnProperty("startingHp") !== true) {
                pokemon.startingHp = pokemon.hp;
                pokemon.hp = parseInt(pokemon.hp) - damage;
                this.setState({ userCurrentPokemon: pokemon })
            }
            else {
                pokemon.hp = pokemon.hp - damage;
                if (pokemon.hp > 0) {
                    this.setState({ userCurrentPokemon: pokemon })
                }
                else {
                    this.setState({ userCurrentPokemon: {} })
                    this.setState({ switching: true })
                }
            }





        }
        else {
            let pokemon = this.state.enemyCurrentPokemon;
            if (pokemon.hasOwnProperty("startingHp") !== true) {
                pokemon.startingHp = pokemon.hp;
                pokemon.hp = parseInt(pokemon.hp) - damage;
                this.setState({ enemyCurrentPokemon: pokemon })
            }
            else {
                pokemon.hp = pokemon.hp - damage;
                if (pokemon.hp > 0) {
                    this.setState({ enemyCurrentPokemon: pokemon })
                }
                else {
                    this.setState({ enemyCurrentPokemon: {} })
                    let cynthPoke = Math.floor(Math.random() * (this.state.enemyPokemon.length));
                    this.setEnemyCurrentPokemon(cynthPoke);

                }

            }





        }
    }





    cynthSelectMove() {
        console.log("inside cynth")
        //inside this function user refers to the program user, not the move user
        const userPoke = this.state.userCurrentPokemon;
        const enemyPoke = this.state.enemyCurrentPokemon;
        const moves = [this.state.enemyMove1, this.state.enemyMove2, this.state.enemyMove3, this.state.enemyMove4]
        //check if slower
        //if slower, check for priority moves, if a move has priority check if will knock out, if it will, use that move
        //if faster, priority move(s) wont kill, or no priority moves, use highest damage
        let highestDamage = 0;
        let highestDamageMove = 0;
        //checks if slower
        if (userPoke.speed > enemyPoke.speed) {
            for (let i = 0; i < moves.length; i++) {
                //if move has priority
                if (moves[i].priority > 0) {
                    //if damage is greater than the user's hp it will kill, use it
                    let damage = this.calculateDamage(enemyPoke, moves[i], userPoke)
                    if (damage > userPoke.hp) {
                        console.log(moves[i])
                        this.useMove(true, damage)
                        return;
                    }
                }
            }
        }
        //slower, or no priority moves would kill
        //loop thru moves, calc damage for each, use the highest damage
        for (let i = 0; i < moves.length; i++) {
            let damage = this.calculateDamage(enemyPoke, moves[i], userPoke)
            //if damage is higher than highest recorded, replace that value, store the move slot
            if (damage > highestDamage) {
                highestDamage = damage;
                highestDamageMove = i;
            }
        }
        this.handleMessages(`Cynthia used ${moves[highestDamageMove].name}`)
        this.handleMessages(`She did ${highestDamage} damage`)
        console.log("done with calcs highest move is " + moves[highestDamageMove].name + " with " + highestDamage)
        this.useMove(true, highestDamage)



    }



    handleTurnSwitch() {

        this.setState({ isLoading: true })
        if (this.state.switching === true) {
            this.setState({ switching: false })
        }
        this.setState({ turn: this.state.turn + 1 })

    }

    handleTurnBattle(damage) {
        this.setState({ isLoading: true })
        if (this.state.enemyCurrentPokemon.speed > this.state.userCurrentPokemon.speed) {
            this.cynthSelectMove()
            this.handleMessages(`She was faster but you did ${damage} damage`)
            if (this.state.userCurrentPokemon.hp > 0) {
                this.useMove(false, damage)
            }
            else {
                this.handleMessages(`Your pokemon fainted.`)
            }
        }
        else {
            this.useMove(false, damage)
            this.handleMessages(`You were faster and did ${damage} damage`)
            console.log(this.state.enemyCurrentPokemon.hp > 0)
            if (this.state.enemyCurrentPokemon.hp > 0) {
                this.cynthSelectMove()

            }
            else {
                this.handleMessages(`Her pokemon fainted!`)
            }
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
        let current = {};
        let newCurrent;
        if (this.state.userCurrentPokemon !== {}) {
            current = this.state.userCurrentPokemon;
        }
        let array = this.state.userPokemon;
        if (current !== {}) {
            newCurrent = array.splice(pkmnSlot, 1)
            newCurrent = newCurrent[0]
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
        this.getUserMoveData(newCurrent);
        this.handleTurnSwitch();
        this.handleMessages(`You sent out ${newCurrent.name}!`)
    }

    getUserMoveData(pkmn) {
        const baseUrl = `http://localhost:8084/api/v1/move/`;
        let url;
        url = baseUrl + pkmn.move1;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove1: res.data[0] })
        });
        url = baseUrl + pkmn.move2;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove2: res.data[0] })
        });
        url = baseUrl + pkmn.move3;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove3: res.data[0] })
        });
        url = baseUrl + pkmn.move4;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ userMove4: res.data[0] })
        });
    }





    setEnemyCurrentPokemon(pkmnSlot) {
        let current = {};
        let newCurrent;
        if (this.state.enemyPokemon.length !== 0) {
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
            this.getEnemyMoveData(newCurrent)
            this.handleMessages(`She send out ${newCurrent.name}`)
        }
        else {
            alert("Congratulations! You won against cynthia. Your team will now be added to the hall of fame. Think you can do it with another team?")
            this.props.handleVictory();
            console.log("you win")
        }
    }


    getEnemyMoveData(pkmn) {

        const baseUrl = `http://localhost:8084/api/v1/move/`;
        let url;
        url = baseUrl + pkmn.move1;
        axios.get(url).then(res => {

            console.log(res.data[0]);
            this.setState({ enemyMove1: res.data[0] })
        });
        url = baseUrl + pkmn.move2;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ enemyMove2: res.data[0] })
        });
        url = baseUrl + pkmn.move3;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ enemyMove3: res.data[0] })
        });
        url = baseUrl + pkmn.move4;
        axios.get(url).then(res => {
            console.log(res.data[0]);
            this.setState({ enemyMove4: res.data[0] })
        });
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




        if (this.state.userCurrentPokemon.hasOwnProperty("name") === false && this.state.userPokemon.length === 0 && this.state.winner === null) {
            this.setState({ winner: "enemy" })
            this.props.handleLoss();
            console.log("you lose")
        }
        else if (this.state.winner !== null) {

        }





        if (this.state.switchOccured === true) {
            this.setState({ switchOccured: false });
        }

        if (this.state.turn == 0) {
            this.handleFirstTurn();
        }
        else if (this.state.isLoading === true) {
            this.setState({ isLoading: false })
        }

        if (this.state.userCurrentPokemon.hp <= 0) {
            this.setState({ userCurrentPokemon: {} })
            this.setState({ switching: true })
            this.setState({ isLoading: true })
        }
        else if (this.state.enemyCurrentPokemon.hp <= 0) {
            this.setState({ enemyCurrentPokemon: {} })
            let cynthPoke = Math.floor(Math.random() * (this.state.enemyPokemon.length));
            this.setEnemyCurrentPokemon(cynthPoke);
            this.setState({ isLoading: true })
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
                    <h1 onClick={this.showState}>Show state</h1>
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