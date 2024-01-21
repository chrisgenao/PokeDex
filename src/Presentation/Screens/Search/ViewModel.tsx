import React, { useEffect, useState } from 'react'
import { Result, SimplePokemon } from '../../../Data/Sources/Remote/Models/ResponsePokeAPI'
import { GetPokemonsPaginatedUseCase } from '../../../Domain/UseCases/Pokemon/GetPokemonsPaginatedUseCase'


const SearchPokemonViewModel = () => {

    const [isFetching, setIsFetching] = useState(true)
    const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([])

    const loadPokemons = async () => {
        const response = await GetPokemonsPaginatedUseCase(0, true)

        mapPokemonList(response.results)

    }

    const mapPokemonList = (_pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = _pokemonList.map(({ name, url }) => {

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2]
            const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            
            
            return { id, picture, name: nameUppercase }

        })

        setPokemonList(newPokemonList)
        setIsFetching(false)
    }

    useEffect(() => {
        loadPokemons()
    }, [])






    return {
        isFetching,
        pokemonList,
    }
}

export default SearchPokemonViewModel