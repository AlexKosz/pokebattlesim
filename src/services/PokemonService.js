import axios from 'axios';

const POKE_API_POKE_BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

class PokemonService {

    async getPokeInfo(id) {
        let url = POKE_API_POKE_BASE_URL + id;
        let res = await axios.get(url);
        return res;
    }
}


export default new PokemonService()