import React from 'react';
import MoveService from '../services/MoveService';
// import axios from 'axios';

class ListMoveComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moves: []
            // ,apiMoves: [],   see commented out code below
            // apiMoveInfo: []
        };
    }

    componentDidMount() {
        MoveService.getMoves().then((res) => {
            this.setState({ moves: res.data });
        })
        // Code from orginially adding all move's data into the SQL database
        // Yes it's a little sloppy, but it has literally ZERO use now, so why bother refactoring
        // MoveService.getApiMoves().then((res) => {
        //     this.setState({ apiMoves: res.data.results });
        //     console.log(this.state);
        //     let i = 2;
        //     for (let i = 2; i < this.state.apiMoves.length; i++) {
        //         MoveService.getMoveInfo(this.state.apiMoves[i].url).then((res) => {
        //             this.setState({ apiMoveInfo: res.data })
        //             console.log(this.state.apiMoveInfo);
        //             let dmgClass = "";
        //             if (this.state.apiMoveInfo.damage_class.hasOwnProperty("name")) {
        //                 dmgClass = this.state.apiMoveInfo.damage_class.name;
        //             }
        //             else {
        //                 dmgClass = this.state.apiMoveInfo.damage_class
        //             }
        //             let move = {
        //                 "id": this.state.apiMoveInfo.id,
        //                 "name": this.state.apiMoveInfo.name,
        //                 "accuracy": this.state.apiMoveInfo.accuracy,
        //                 "damage_class": dmgClass,
        //                 "power": this.state.apiMoveInfo.power,
        //                 "pp": this.state.apiMoveInfo.pp,
        //                 "priority": this.state.apiMoveInfo.priority,
        //                 "type": this.state.apiMoveInfo.type.name,
        //             }
        //             console.log(move)
        //             MoveService.addMove(move);
        //         })
        //     }
        // })
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Move List</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>name</th>
                            <th>accuracy</th>
                            <th>damage_class</th>
                            <th>power</th>
                            <th>pp</th>
                            <th>type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.moves.map(
                                move =>
                                    <tr key={move.id}>
                                        <td>{move.id}</td>
                                        <td>{move.name}</td>
                                        <td>{move.accuracy}</td>
                                        <td>{move.damage_class}</td>
                                        <td>{move.power}</td>
                                        <td>{move.pp}</td>
                                        <td>{move.type}</td>
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        )

    }
}





export default ListMoveComponent;