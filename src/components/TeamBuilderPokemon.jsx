import React from 'react';

import PokemonService from '../services/PokemonService';
import "../../src/styles.css";
import axios from 'axios';


const POKE_API_POKE_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

class TeamBuilderPokemon extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemonList: [],
            pokeListVis: false,
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
        let pokemon = {};
        axios.get(url).then((res) => {
            pokemon = {
                moveList: res.data.moves,
                id: id,
                name: this.capitalizeFirstLetter(res.data.name),
                type1: this.capitalizeFirstLetter(res.data.types[0].type.name),
                hp: this.calcHp(res.data.stats[0].base_stat),
                attack: this.calcStat(res.data.stats[1].base_stat),
                defense: this.calcStat(res.data.stats[2].base_stat),
                specialAttack: this.calcStat(res.data.stats[3].base_stat),
                specialDefense: this.calcStat(res.data.stats[4].base_stat),
                speed: this.calcStat(res.data.stats[5].base_stat),
                moves: []
            };
            if (res.data.types[1]) {
                pokemon.type2 = this.capitalizeFirstLetter(res.data.types[1].type.name)
            }
            else {
                pokemon.type2 = ""
            }
            this.props.setPoke(pokemon);
        })
        this.setState({ pokeListVis: false })
    }

    componentDidMount() {
        let tempArr = [...Array(494).keys()]
        tempArr.shift()
        this.setState({ pokemonList: tempArr })
        console.log(this.state.pokemonList)
        console.log(this.props)
    }


    render() {


        return (
            <div>
                <div className="wrapper">
                    <div className="pokepickcard">
                        <img src={`/assets/sprites/pokemon/front/${this.props.pokemon.id}.png`} alt="pokemon 11" onClick={this.toggleSelect} />
                        <div className="info">
                            <div className="stats">
                                <div className="statRow">
                                    <div className="stat">
                                        <p><strong>{this.props.pokemon.name}</strong></p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>{this.props.pokemon.type1}</strong></p>
                                        <p><strong>{this.props.pokemon.type2}</strong></p>
                                    </div>
                                </div>
                                <div className="statRow">
                                    <div className="stat">
                                        <p><strong>Hp:</strong> {this.props.pokemon.hp}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Attack:</strong> {this.props.pokemon.attack}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Defense:</strong> {this.props.pokemon.defense}</p>
                                    </div>
                                </div>

                                <div className="statRow">
                                    <div className="stat">
                                        <p><strong>Special Attack:</strong> {this.props.pokemon.specialAttack}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Special Defense:</strong> {this.props.pokemon.specialDefense}</p>
                                    </div>
                                    <div className="stat">
                                        <p><strong>Speed:</strong> {this.props.pokemon.speed}</p>
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