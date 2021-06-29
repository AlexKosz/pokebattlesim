import React from 'react';
import TeamBuilderPokemon from './TeamBuilderPokemon';


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
    moves: []
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
        };
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

    render() {
        return (
            <div>
                <TeamBuilderPokemon pokemon={this.state.pokemon1} setPoke={(pokemon => this.setPoke1(pokemon))} />
                <TeamBuilderPokemon pokemon={this.state.pokemon2} setPoke={(pokemon => this.setPoke2(pokemon))} />
                <TeamBuilderPokemon pokemon={this.state.pokemon3} setPoke={(pokemon => this.setPoke3(pokemon))} />
                <TeamBuilderPokemon pokemon={this.state.pokemon4} setPoke={(pokemon => this.setPoke4(pokemon))} />
                <TeamBuilderPokemon pokemon={this.state.pokemon5} setPoke={(pokemon => this.setPoke5(pokemon))} />
                <TeamBuilderPokemon pokemon={this.state.pokemon6} setPoke={(pokemon => this.setPoke6(pokemon))} />
            </div>
        );

    }
}



export default TeamBuilder;