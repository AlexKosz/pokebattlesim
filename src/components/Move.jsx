import React from 'react';
import axios from 'axios';



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
        let move = {};
        let url = `http://localhost:8084/api/v1/move/${this.props.move.move.name}`
        axios.get(url).then(res => {
            move = {
                id: res.data[0].id,
                name: res.data[0].name,
                accuracy: res.data[0].accuracy,
                damage_class: res.data[0].damage_class,
                power: res.data[0].power,
                pp: res.data[0].pp,
                priority: res.data[0].priority,
                type: res.data[0].type
            };
            this.setState({ info: move });
            this.state.moveInfoVis ? this.setState({ moveInfoVis: false }) : this.setState({ moveInfoVis: true });
            this.state.infoMessage === "View" ? this.setState({ infoMessage: "Hide" }) : this.setState({ infoMessage: "View" });

        });
    }




    getMoveinfo = () => {
        let move = {};
        let url = `http://localhost:8084/api/v1/move/${this.props.move.move.name}`
        axios.get(url).then(res => {
            move = {
                id: res.data[0].id,
                name: res.data[0].name,
                accuracy: res.data[0].accuracy,
                damage_class: res.data[0].damage_class,
                power: res.data[0].power,
                pp: res.data[0].pp,
                priority: res.data[0].priority,
                type: res.data[0].type
            };
            this.setState({ info: move });
            console.log(this.state.info);
            if (this.state.moveInfoVis) {
                this.setState({ moveInfoVis: false })
            }
            if (move.damage_class === "status" || move.power === 0) {
                alert("One hit KO moves and status increase/decrease/affliction moves have not yet been implemented, so this move will do nothing in battle!!!")
            }
            this.props.setMove(move);
        });
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
                    <p className="clickable" onClick={this.getMoveinfo}>Select this move</p>
                </div>
                <div className="wrapper 2" style={{ display: this.state.moveInfoVis ? 'block' : 'none' }}>
                    <p><strong>Power: </strong>{this.state.info.power}</p>
                    <p><strong>Accuracy: </strong>{this.state.info.accuracy}</p>
                    <p><strong>PP: </strong>{this.state.info.pp}</p>
                    <p><strong>Dmg Class: </strong>{this.state.info.damage_class}</p>
                    <p><strong>Priority: </strong>{this.state.info.priority}</p>
                </div>



            </div>
        )

    }
}



export default Move;