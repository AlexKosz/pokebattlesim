import React from 'react';

class BattleMessages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
        };
    }


    componentDidMount() {
        this.setState({ messages: this.props.messages })
    }

    render() {
        return (

            <div>
                {
                    this.state.messages.map(
                        message =>
                            <h3>{message}</h3>
                    )
                }
            </div>
        );
    }
}


export default BattleMessages;