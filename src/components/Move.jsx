import React from 'react';

class Move extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            moveInfoVis: false,
            infoMessage: "View",
            info: { move: props.move.move.name }
        };
    }


    toggleMoveInfo = () => {
        this.state.moveInfoVis ? this.setState({ moveInfoVis: false }) : this.setState({ moveInfoVis: true })
        this.state.infoMessage === "View" ? this.setState({ infoMessage: "Hide" }) : this.setState({ infoMessage: "View" })
    }

    setMove = () => {
        if (this.state.moveInfoVis) {
            this.setState({ moveInfoVis: false })
        }
        this.props.setMove(this.props.move.move.name);
    }

    //from https://www.codegrepper.com/code-examples/javascript/change+initial+value+of+string+to+capital+letter+in+react+js
    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (
            <div>
                <div className="wrapper2">
                    <p><strong>{this.capitalizeFirstLetter(this.props.move.move.name)}</strong></p>
                    <p className="clickable" onClick={this.toggleMoveInfo}>{this.state.infoMessage} info</p>
                    <p className="clickable" onClick={this.setMove}>Select this move</p>
                </div>




            </div>
        )

    }
}



export default Move;