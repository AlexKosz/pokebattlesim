import axios from 'axios';

const MOVE_API_BASE_URL = "http://localhost:8084/api/v1/moves"
// const ADD_MOVE_URL = "http://localhost:8084/api/v1/addMove"

// const POKE_API_MOVE_BASE_URL = "http://localhost:8084/api/v1/move/"

class MoveService {
    getMoves() {
        return axios.get(MOVE_API_BASE_URL);
    }
    // Old code used to fill SQL database with individual move data
    // getMoveInfo(url) {
    //     return axios.get(url);
    // }
    // getApiMoves() {
    //     return axios.get("https://pokeapi.co/api/v2/move?limit=844");
    // }
    // addMove(move) {
    //     return axios.post(ADD_MOVE_URL, move);
    // }
}

export default new MoveService()