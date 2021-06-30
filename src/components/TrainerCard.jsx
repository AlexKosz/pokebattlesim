import React from 'react';

class TrainerCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemonHalf1: [],
            pokemonHalf2: [],

        };
    }



    componentDidMount() {

        this.setState({ pokemonHalf1: (this.props.pokemon).slice(0, 3) })
        this.setState({ pokemonHalf2: (this.props.pokemon).slice(3, 6) })
    }



    render() {
        return (
            <div>
                <div className="trainerCard">
                    <div className="trainerImg">
                        <img src={`/assets/sprites/trainers/${this.props.trainer.trainerSprite}.png`} alt="trainerSprite" />
                    </div>

                    <div className="cardInfo">
                        <div className="trainerName">
                            <h1 className>{this.props.trainer.name}</h1>
                        </div>
                        <div className="PkmnRow">
                            {
                                this.state.pokemonHalf1.map(
                                    pokemon =>
                                        <img src={`/assets/sprites/pokemon/front/${pokemon.speciesId}.png`} alt={`/assets/sprites/pokemon/${pokemon.speciesId}.png`} className="cardPkmn" key={pokemon.name} />
                                )
                            }
                        </div>
                        <div className="PkmnRow">
                            {
                                this.state.pokemonHalf2.map(
                                    pokemon =>
                                        <img src={`/assets/sprites/pokemon/front/${pokemon.speciesId}.png`} alt={`/assets/sprites/pokemon/${pokemon.speciesId}.png`} className="cardPkmn" key={pokemon.name} />
                                )
                            }
                        </div>


                    </div>


                </div>


            </div>
        );
    }
}



export default TrainerCard;