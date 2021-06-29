import React from 'react';
import TeamBuilderPokemon from './TeamBuilderPokemon';

class TeamBuilder extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        };
    }

    render() {
        return (
            <div>
                <TeamBuilderPokemon />
                <TeamBuilderPokemon />
                <TeamBuilderPokemon />
                <TeamBuilderPokemon />
                <TeamBuilderPokemon />
                <TeamBuilderPokemon />
            </div>
        );

    }
}



export default TeamBuilder;