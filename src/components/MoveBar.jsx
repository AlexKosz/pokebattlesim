import React from 'react';

class MoveBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moves: ["asdf", "asdf", "adf", "adsf"],
            isLoading: true
        };
    }

    componentDidMount() {
        if (this.props.moves[0] !== undefined &&
            this.props.moves[1] !== undefined &&
            this.props.moves[2] !== undefined &&
            this.props.moves[3] !== undefined) {
            this.setState({ moves: this.props.moves })

        }

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.moves !== this.state.moves) { }

        if (this.props.moves[0] === undefined ||
            this.props.moves[1] === undefined ||
            this.props.moves[2] === undefined ||
            this.props.moves[3] === undefined) {
        }

        else if (this.state.isLoading === true) {
            this.setState({ isLoading: false })
            this.props.setMovesLoaded();
        }
        else if (this.props.moves[0].id !== this.state.moves[0].id ||
            this.props.moves[1].id !== this.state.moves[1].id ||
            this.props.moves[2].id !== this.state.moves[2].id ||
            this.props.moves[3].id !== this.state.moves[3].id) {

            this.props.initSwitch();
            this.props.cancelSwitching();
        }

    }

    render() {
        if (this.state.isLoading) {
            return <div />
        }

        return (
            <div>
                {
                    this.state.moves.map(
                        (move, index) =>
                            <div className="move" style={{ flex: 1 }} onClick={() => this.props.useMove(index + 1)}>
                                <h3>{move.name}</h3>
                            </div>
                    )
                }
                <div className="move" style={{ flex: 1 }} style={{ color: "#F21" }} onClick={this.props.initSwitch}>
                    <h3>Switch pokemon</h3>
                </div>

            </div>
        );
    }
}

export default MoveBar;