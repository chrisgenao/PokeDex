import { Move } from "../Entities/Move";

export interface MoveRepository {
    getMoveDetail(moveId: string): Promise<Move>
    // getPokemonsPaginated(currentOffset: number): Promise<ResponsePokeAPI>
}