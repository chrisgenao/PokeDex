import { ResponsePokeAPI } from "../../Data/Sources/Remote/Models/ResponsePokeAPI";
import { Pokemon } from "../Entities/Pokemon";

export interface PokemonRepository {
    getPokemonsPaginated(currentOffset: number): Promise<ResponsePokeAPI>
    getPokemonDetail(pokemonId: string): Promise<Pokemon>
}