import React from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            redir: false,
            teams: []
        };
        this.redir = this.redir.bind(this);

    }

    redir() {
        this.setState({ redir: true })
    }

    componentDidMount() {
        let teamsUrl = `http://localhost:8084/api/v1/teams/victorious`
        axios.get(teamsUrl).then(res => {
            this.setState({ teams: res.data })
            console.log(res.data)
        });
    }

    render() {

        if (this.state.redir === true) {
            return <Redirect to="/teamBuilder" noThrow />
        }

        return (
            <div className="home">
                <h1>Welcome to <span style={{ color: "rgb(226, 255, 97)" }}>Battle Cynthia</span></h1>
                <div className="wrapper4">
                    <img src="assets/sprites/trainers/18.png" />
                    <div>
                        <h3>A pokemon team builder/battle simulator where you ...well battle Cynthia</h3>
                        <p>Cynthia is the champion in the Pokemon Diamond, Pearl, and Platinum. Cynthia is one of the hardest trainer battles in any of the pokemon games,
                            many trainers remember their first time taking down her fearsome Garchomp</p>
                        <h2>Think you're up for the challenge?</h2>
                    </div>
                    <img src="assets/sprites/pokemon/front/445.png" />
                </div>
                <h2 className="clickable link" onClick={this.redir}>Click here to build your team and go to battle!</h2>
                <h3>Below are all the trainers that managed to take her down!</h3>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    {
                        this.state.teams.map(team =>
                            <div>
                                <h4>{team.name}</h4>
                                <img src={`assets/sprites/trainers/${team.trainerSprite}.png`} />
                            </div>


                        )

                    }
                </div>


            </div >
        );
    }
}


export default Home;