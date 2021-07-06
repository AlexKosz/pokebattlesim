import axios from 'axios';

const MOVE_API_BASE_URL = "http://localhost:8084/api/v1/moves"
// const ADD_MOVE_URL = "http://localhost:8084/api/v1/addMove"

// const POKE_API_MOVE_BASE_URL = "http://localhost:8084/api/v1/move/"

class MoveService {
    getMoves() {
        return axios.get(MOVE_API_BASE_URL);
    }



    getTypeMultiplier(moveType, defenderType) {
        moveType = moveType.toLowerCase();
        defenderType = defenderType.toLowerCase();
        // console.log(moveType)
        // console.log(defenderType)
        switch (moveType) {
            case "normal":
                switch (defenderType) {
                    case "rock":
                        return 0.5;
                    case "ghost":
                        return 0;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            case "fire":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "water":
                        return 0.5;
                    case "grass":
                        return 2;
                    case "ice":
                        return 2;
                    case "bug":
                        return 2;
                    case "rock":
                        return 0.5;
                    case "dragon":
                        return 0.5;
                    case "steel":
                        return 2;
                    default:
                        return 1;
                }
            case "water":
                switch (defenderType) {
                    case "fire":
                        return 2;
                    case "water":
                        return 0.5;
                    case "grass":
                        return 0.5;
                    case "ground":
                        return 2;
                    case "rock":
                        return 2;
                    case "dragon":
                        return 0.5;
                    default:
                        return 1;
                }
            case "grass":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "water":
                        return 2;
                    case "grass":
                        return 0.5;
                    case "poison":
                        return 0.5;
                    case "ground":
                        return 2;
                    case "flying":
                        return 0.5;
                    case "bug":
                        return 0.5;
                    case "rock":
                        return 2;
                    case "dragon":
                        return 0.5;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            case "electric":
                switch (defenderType) {
                    case "water":
                        return 2;
                    case "grass":
                        return 0.5;
                    case "electric":
                        return 0.5;
                    case "ground":
                        return 0;
                    case "flying":
                        return 2;
                    case "dragon":
                        return 0.5;
                    default:
                        return 1;
                }
            case "ice":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "water":
                        return 0.5;
                    case "grass":
                        return 2;
                    case "ice":
                        return 0.5;
                    case "ground":
                        return 2;
                    case "flying":
                        return 2;
                    case "dragon":
                        return 2;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            case "fighting":
                switch (defenderType) {
                    case "normal":
                        return 2;
                    case "ice":
                        return 2;
                    case "poison":
                        return 0.5;
                    case "flying":
                        return 0.5;
                    case "psychic":
                        return 0.5;
                    case "bug":
                        return 0.5;
                    case "rock":
                        return 2;
                    case "ghost":
                        return 0;
                    case "dark":
                        return 2;
                    case "steel":
                        return 2;
                    case "fairy":
                        return 0.5;
                    default:
                        return 1;
                }
            case "poison":
                switch (defenderType) {
                    case "grass":
                        return 2;
                    case "poison":
                        return 0.5;
                    case "ground":
                        return 0.5;
                    case "rock":
                        return 0.5;
                    case "ghost":
                        return 0.5;
                    case "steel":
                        return 0;
                    case "fairy":
                        return 2;
                    default:
                        return 1;
                }
            case "ground":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "grass":
                        return 0.5;
                    case "electric":
                        return 2;
                    case "poison":
                        return 2;
                    case "flying":
                        return 0;
                    case "bug":
                        return 0.5;
                    case "rock":
                        return 2;
                    case "steel":
                        return 2;
                    default:
                        return 1;
                }
            case "flying":
                switch (defenderType) {
                    case "grass":
                        return 2;
                    case "electric":
                        return 0.5;
                    case "fighting":
                        return 2;
                    case "bug":
                        return 2;
                    case "rock":
                        return 0.5;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            case "psychic":
                switch (defenderType) {
                    case "fighting":
                        return 2;
                    case "poison":
                        return 2;
                    case "psychic":
                        return 0.5;
                    case "dark":
                        return 0;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            case "bug":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "grass":
                        return 2;
                    case "fighting":
                        return 0.5;
                    case "poison":
                        return 0.5;
                    case "flying":
                        return 0.5;
                    case "psychic":
                        return 2;
                    case "ghost":
                        return 0.5;
                    case "dark":
                        return 2;
                    case "steel":
                        return 0.5;
                    case "fairy":
                        return 0.5;
                    default:
                        return 1;
                }
            case "rock":
                switch (defenderType) {
                    case "fire":
                        return 2;
                    case "ice":
                        return 2;
                    case "fighting":
                        return 0.5;
                    case "ground":
                        return 0.5;
                    case "flying":
                        return 2;
                    case "bug":
                        return 2;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            case "ghost":
                switch (defenderType) {
                    case "normal":
                        return 0;
                    case "psychic":
                        return 2;
                    case "ghost":
                        return 2;
                    case "dark":
                        return 0.5;
                    default:
                        return 1;
                }
            case "dragon":
                switch (defenderType) {
                    case "dragon":
                        return 2;
                    case "steel":
                        return 0.5;
                    case "fairy":
                        return 0;
                    default:
                        return 1;
                }
            case "dark":
                switch (defenderType) {
                    case "fighting":
                        return 0.5;
                    case "psychic":
                        return 2;
                    case "ghost":
                        return 2;
                    case "dark":
                        return 0.5;
                    case "fairy":
                        return 0.5;
                    default:
                        return 1;
                }
            case "steel":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "water":
                        return 0.5;
                    case "electric":
                        return 0.5;
                    case "ice":
                        return 2;
                    case "rock":
                        return 2;
                    case "steel":
                        return 0.5;
                    case "fairy":
                        return 2;
                    default:
                        return 1;
                }
            case "fairy":
                switch (defenderType) {
                    case "fire":
                        return 0.5;
                    case "fighting":
                        return 2;
                    case "poison":
                        return 0.5;
                    case "dragon":
                        return 2;
                    case "dark":
                        return 2;
                    case "steel":
                        return 0.5;
                    default:
                        return 1;
                }
            default:
                return 1;
        }
    }



    // }

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