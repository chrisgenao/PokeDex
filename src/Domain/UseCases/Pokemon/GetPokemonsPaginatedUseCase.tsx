import React from 'react'
import { PokemonRepositoryImpl } from '../../../Data/Repositories/PokemonRepository'

const { getPokemonsPaginated } = new PokemonRepositoryImpl()

export const GetPokemonsPaginatedUseCase = (currentOffset: number, limit?: boolean) => {
    return getPokemonsPaginated(currentOffset, limit)
}
