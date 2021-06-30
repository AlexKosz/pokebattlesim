import React from 'react';

class Battler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            turn: 1,
            winner: null,
            userTeam: {},
            userPokemon: [],
            userCurrentPokemon: {},
            enemyTeam: {},
            enemyPokemon: [],
            enemyCurrentPokemon: []
        };
        // this.getCynthia = this.getCynthia.bind(this);
    }



    componentDidMount() {

    }

    render() {
        return (
            <div>

            </div>
        );
    }
}



export default Battler;