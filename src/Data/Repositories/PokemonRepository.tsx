import { AxiosError, AxiosResponse } from 'axios';
import { PokemonRepository } from '../../Domain/Repositories/PokemonRepository';
import { PokemonAPI } from '../Sources/Remote/API/PokeAPI';
import { ResponsePokeAPI } from '../Sources/Remote/Models/ResponsePokeAPI';
import { Pokemon } from '../../Domain/Entities/Pokemon';


export class PokemonRepositoryImpl implements PokemonRepository {

    async getPokemonDetail(pokemonId: string): Promise<Pokemon> {
        try {

            const response = await PokemonAPI.get<Pokemon>(`/pokemon/${pokemonId}`)

            return Promise.resolve(response.data)

        } catch (error) {
            let e = (error as AxiosError);
            console.log('Error guardando el usuario: ', JSON.stringify(e.response?.data))
            const apiError: Pokemon = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }

    async getPokemonsPaginated(currentOffset: number, limit?: boolean): Promise<ResponsePokeAPI> {
        try {

            console.log(limit)

            let response: AxiosResponse<ResponsePokeAPI, any>

            if (limit) {
                response = await PokemonAPI.get<ResponsePokeAPI>(`/pokemon?&limit=1500`)
            } else {
                response = await PokemonAPI.get<ResponsePokeAPI>(`/pokemon?offset=${currentOffset}&limit=40`)
            }

            return Promise.resolve(response.data)

        } catch (error) {
            let e = (error as AxiosError);
            console.log('Error guardando el usuario: ', JSON.stringify(e.response?.data))
            const apiError: ResponsePokeAPI = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }

    }

}
