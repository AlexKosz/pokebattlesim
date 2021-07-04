import React from 'react';

class SwitchingCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            pokemon: []
        };
    }

    componentDidMount() {
        this.setState({ pokemon: this.props.pokemon })

    }

    testClick(target) {
        this.props.clickHandler(target.index);
    }

    render() {
        return (
            <div>
                <h2>Select a pokemon to send out</h2>
                <div className="wrapper3">
                    {
                        this.state.pokemon.map(
                            (pokemon, index) =>
                                <img src={`/assets/sprites/pokemon/front/${pokemon.speciesId}.png`} alt="" onClick={() => this.testClick({ index })} className="clickable" />
                        )
                    }
                    <div>
                        <button onClick={() => this.props.cancelSwitching()}>
                            Cancel
                        </button>
                    </div>
                </div>

            </div>
        );
    }
}


export default SwitchingCard;