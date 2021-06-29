import React from 'react';

import PokemonService from '../services/PokemonService';
import "../../src/styles.css";
import axios from 'axios';


const POKE_API_POKE_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

class TeamBuilderPokemon extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            moveList: [],
            pokemonList: [],
            pokeListVis: false,
            id: 0,
            name: "Select a pokemon",
            type1: "Test1",
            type2: "Test2",
            hp: 0,
            attack: 0,
            defense: 0,
            specialAttack: 0,
            specialDefense: 0,
            speed: 0
        };
        this.toggleSelect = this.toggleSelect.bind(this);
        this.setPokemon = this.setPokemon.bind(this);
    }

    toggleSelect = () => {
        console.log("clicked");
        this.state.pokeListVis ? this.setState({ pokeListVis: false }) : this.setState({ pokeListVis: true })
    }


    //formula from https://www.dragonflycave.com/mechanics/stats
    calcStat = (b) => {
        return Math.floor(Math.floor((2 * b + 31 + 0) * 100 / 100 + 5) * 1);
    }

    calcHp = (b) => {
        return Math.floor((2 * b + 31 + 0) * 100 / 100 + 100 + 10);
    }


    //from https://www.codegrepper.com/code-examples/javascript/change+initial+value+of+string+to+capital+letter+in+react+js
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    setPokemon = (id) => {
        id = id.pokemon
        let url = POKE_API_POKE_BASE_URL + id;
        axios.get(url).then((res) => {
            this.setState({ id: id });
            this.setState({ name: this.capitalizeFirstLetter(res.data.name) });
            this.setState({ type1: this.capitalizeFirstLetter(res.data.types[0].type.name) });
            if (res.data.types[1]) {
                this.setState({ type2: this.capitalizeFirstLetter(res.data.types[1].type.name) });
            }
            else {
                this.setState({ type2: "" });
            }
            this.setState({ hp: this.calcHp(res.data.stats[0].base_stat) });
            this.setState({ attack: this.calcStat(res.data.stats[1].base_stat) });
            this.setState({ defense: this.calcStat(res.data.stats[2].base_stat) });
            this.setState({ specialAttack: this.calcStat(res.data.stats[3].base_stat) });
            this.setState({ specialDefense: this.calcStat(res.data.stats[4].base_stat) });
            this.setState({ speed: this.calcStat(res.data.stats[5].base_stat) });
            this.setState({ moveList: res.data.moves });
        })
        this.setState({ pokeListVis: false })

    }

    componentDidMount() {
        let tempArr = [...Array(494).keys()]
        tempArr.shift()
        this.setState({ pokemonList: tempArr })
        console.log(this.state.pokemonList)
    }


    render() {


        return (
            <div>
                <div className="wrapper">
                    <div className="pokepickcard">
                        <img src={`/assets/sprites/pokemon/front/${this.state.id}.png`} alt="pokemon 11" onClick={this.toggleSelect} />
                        <div className="info">
                            <div className="stats">
                                <div className="statRow">
                                    <div className="stat">
                                        <p><strong>{this.state.name}</strong></p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>{this.state.type1}</strong></p>
                                        <p><strong>{this.state.type2}</strong></p>
                                    </div>
                                </div>
                                <div className="statRow">
                                    <div className="stat">
                                        <p><strong>Hp:</strong> {this.state.hp}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Attack:</strong> {this.state.attack}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Defense:</strong> {this.state.defense}</p>
                                    </div>
                                </div>

                                <div className="statRow">
                                    <div className="stat">
                                        <p><strong>Special Attack:</strong> {this.state.specialAttack}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Special Defense:</strong> {this.state.specialDefense}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Speed:</strong> {this.state.speed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="moves">
                            <div className="moveBlock">
                                <div className="move">Move 1</div>
                                <div className="move">Move 2</div>
                            </div>
                            <div className="moveBlock">
                                <div className="move">Move 3</div>
                                <div className="move">Move 4</div>
                            </div>
                        </div>
                    </div>




                </div>
                <div className="pokemonSelect" style={{ display: this.state.pokeListVis ? 'block' : 'none' }}>
                    {
                        this.state.pokemonList.map(
                            pokemon =>
                                <img src={`/assets/sprites/pokemon/front/${pokemon}.png`} alt={`pokemon ${pokemon}`} key={pokemon.toString()} onClick={() => this.setPokemon({ pokemon })} />
                        )
                    }
                </div>
            </div>
        )
    }
}



export default TeamBuilderPokemon;