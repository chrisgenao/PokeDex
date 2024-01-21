import React, { useEffect, useState } from 'react'
import { Pokemon } from '../../../Domain/Entities/Pokemon'
import { GetPokemonDetailUseCase } from '../../../Domain/UseCases/Pokemon/GetPokemonDetailUseCase'


const PokemonViewModel = (id: string) => {

    const [isLoading, setIsLoading] = useState(true)
    const [pokemon, setPokemon] = useState<Pokemon>({} as Pokemon)

    useEffect(() => {
        loadPokemonDetail()
    }, [])

    const loadPokemonDetail = async () => {
        const response = await GetPokemonDetailUseCase(id)
        // console.log(JSON.stringify(response, null, 3))

        setPokemon(response)
        setIsLoading(false)
    }



    return {
        pokemon,
        isLoading
    }
}

export default PokemonViewModel
