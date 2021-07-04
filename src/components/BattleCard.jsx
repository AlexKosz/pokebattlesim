import React from 'react';

class BattleCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <div className="battleCard">
                <div className="battleCardImg">
                    <img src={this.props.back ? `/assets/sprites/pokemon/back/${this.props.pokemon.speciesId}.png` : `/assets/sprites/pokemon/front/${this.props.pokemon.speciesId}.png`} alt="pokemon" />
                </div>
                <div className="battleCardInfo">
                    <strong>
                        <h2>{this.props.pokemon.name}</h2>
                        <h2>{this.props.pokemon.hp} / {this.props.pokemon.hasOwnProperty('startingHp') ? this.props.pokemon.startingHp : this.props.pokemon.hp}</h2>
                    </strong>
                </div>

            </div>

        );
    }
}


export default BattleCard;