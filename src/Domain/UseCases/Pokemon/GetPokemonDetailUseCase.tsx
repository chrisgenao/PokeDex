import React from 'react'
import { PokemonRepositoryImpl } from '../../../Data/Repositories/PokemonRepository'

const { getPokemonDetail } = new PokemonRepositoryImpl()

export const GetPokemonDetailUseCase = (pokemonId: string) => {
    return getPokemonDetail(pokemonId)
}
