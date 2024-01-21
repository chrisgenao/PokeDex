import { AxiosError } from "axios";
import { Move } from "../../Domain/Entities/Move";
import { MoveRepository } from "../../Domain/Repositories/MoveRepository";
import { PokemonAPI } from "../Sources/Remote/API/PokeAPI";


export class MoveRepositoryImpl implements MoveRepository {

    async getMoveDetail(moveId: string): Promise<Move> {
        try {
            const response = await PokemonAPI.get<Move>(`/move/${moveId}`)

            return Promise.resolve(response.data)
        } catch (error) {
            let e = (error as AxiosError);
            console.log('Error guardando el usuario: ', JSON.stringify(e.response?.data))
            const apiError: Move = JSON.parse(JSON.stringify(e.response?.data))
            return Promise.resolve(apiError)
        }
    }

}