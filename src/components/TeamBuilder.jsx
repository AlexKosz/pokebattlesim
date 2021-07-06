import React from 'react';
import TeamBuilderPokemon from './TeamBuilderPokemon';
import "../../src/styles.css";
import axios from 'axios';
import { Redirect } from 'react-router-dom';
const pokeTemplate = {
    moveList: [],
    id: 0,
    name: "Select a pokemon",
    type1: "Test1",
    type2: "Test2",
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    moves: ["Move 1", "Move 2", "Move 3", "Move 4"],
    speciesId: 0

};

class TeamBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemon1: pokeTemplate,
            pokemon2: pokeTemplate,
            pokemon3: pokeTemplate,
            pokemon4: pokeTemplate,
            pokemon5: pokeTemplate,
            pokemon6: pokeTemplate,
            trainerSprite: 0,
            name: "",
            trainerListVis: false,
            trainerList: [],
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ name: event.target.value });
    }

    handleSubmit(event) {
        const teamAddUrl = "http://localhost:8084/api/v1/addTeam"
        const pokeAddUrl = "http://localhost:8084/api/v1/addPokemon"

        let team = {
            name: this.state.name,
            trainerSprite: this.state.trainerSprite
        }
        axios.post(teamAddUrl, team).then(res => { });
        axios.post(pokeAddUrl, this.stateToDB(this.state.pokemon1)).then(res => { });
        axios.post(pokeAddUrl, this.stateToDB(this.state.pokemon2)).then(res => { });
        axios.post(pokeAddUrl, this.stateToDB(this.state.pokemon3)).then(res => { });
        axios.post(pokeAddUrl, this.stateToDB(this.state.pokemon4)).then(res => { });
        axios.post(pokeAddUrl, this.stateToDB(this.state.pokemon5)).then(res => { });
        axios.post(pokeAddUrl, this.stateToDB(this.state.pokemon6)).then(res => { });
        this.setState({ redirect: true });
    }

    stateToDB(pokemon) {
        let pokemon2 = {
            name: pokemon.name,
            type1: pokemon.type1,
            hp: pokemon.hp,
            attack: pokemon.attack,
            defense: pokemon.defense,
            spAttack: pokemon.specialAttack,
            spDefense: pokemon.specialDefense,
            speed: pokemon.speed,
            move1: pokemon.moves[0].name,
            move2: pokemon.moves[1].name,
            move3: pokemon.moves[2].name,
            move4: pokemon.moves[3].name,
            speciesId: pokemon.speciesId
        }
        if (pokemon.type2) {
            pokemon2.type2 = pokemon.type2;
        }
        return pokemon2;
    }


    setPoke1 = (pokemon) => {
        this.setState({ pokemon1: pokemon })
    }
    setPoke2 = (pokemon) => {
        this.setState({ pokemon2: pokemon })
    }
    setPoke3 = (pokemon) => {
        this.setState({ pokemon3: pokemon })
    }
    setPoke4 = (pokemon) => {
        this.setState({ pokemon4: pokemon })
    }
    setPoke5 = (pokemon) => {
        this.setState({ pokemon5: pokemon })
    }
    setPoke6 = (pokemon) => {
        this.setState({ pokemon6: pokemon })
    }

    setTrainer = (id) => {
        id = id.trainer
        this.setState({ trainerSprite: id });
        this.setState({ trainerListVis: false })
    }

    toggleSelect = () => {
        this.state.trainerListVis ? this.setState({ trainerListVis: false }) : this.setState({ trainerListVis: true })
    }


    componentDidMount() {
        let tempArr = [...Array(18).keys()]
        tempArr.shift()
        this.setState({ trainerList: tempArr })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/battle" />
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="trainerInfo">
                        <img src={`/assets/sprites/trainers/${this.state.trainerSprite}.png`} alt="trainerSprite" onClick={this.toggleSelect} />
                        <label>
                            Your Name: <input type="text" value={this.state.value} onChange={this.handleChange} />
                        </label>
                    </div>
                    <div className="trainerSelect" style={{ display: this.state.trainerListVis ? 'block' : 'none' }}>
                        {
                            this.state.trainerList.map(
                                trainer =>
                                    <img src={`/assets/sprites/trainers/${trainer}.png`} alt={`trainer ${trainer}`} key={trainer.toString()} onClick={() => this.setTrainer({ trainer })} />
                            )
                        }
                    </div>

                    <TeamBuilderPokemon pokemon={this.state.pokemon1} setPoke={(pokemon => this.setPoke1(pokemon))} />
                    <TeamBuilderPokemon pokemon={this.state.pokemon2} setPoke={(pokemon => this.setPoke2(pokemon))} />
                    <TeamBuilderPokemon pokemon={this.state.pokemon3} setPoke={(pokemon => this.setPoke3(pokemon))} />
                    <TeamBuilderPokemon pokemon={this.state.pokemon4} setPoke={(pokemon => this.setPoke4(pokemon))} />
                    <TeamBuilderPokemon pokemon={this.state.pokemon5} setPoke={(pokemon => this.setPoke5(pokemon))} />
                    <TeamBuilderPokemon pokemon={this.state.pokemon6} setPoke={(pokemon => this.setPoke6(pokemon))} />
                    <input type="submit" value="Submit your team and battle!" className="teamSubmit" />
                </form>
            </div>
        );

    }
}



export default TeamBuilder;