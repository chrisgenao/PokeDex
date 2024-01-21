import React, { useEffect, useRef, useState } from 'react'
import { Result, SimplePokemon } from '../../../Data/Sources/Remote/Models/ResponsePokeAPI'
import { GetPokemonsPaginatedUseCase } from '../../../Domain/UseCases/Pokemon/GetPokemonsPaginatedUseCase'


const HomeViewModel = () => {

    const currentOffset = useRef(0)

    const [isLoading, setIsLoading] = useState(true)
    const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([])


    const mapPokemonList = (_pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = _pokemonList.map(({ name, url }) => {

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2]
            const nameUppercase = name.charAt(0).toUpperCase() + name.slice(1);
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            return { id, picture, name: nameUppercase }

        })

        setPokemonList([...pokemonList, ...newPokemonList])
        setIsLoading(false)
    }


    useEffect(() => {
        loadPokemons(currentOffset.current)
    }, [])

    const loadPokemons = async (currentOffset: number) => {
        setIsLoading(true)
        const response = await GetPokemonsPaginatedUseCase(currentOffset)

        mapPokemonList(response.results)
    }



    return {
        pokemonList,
        currentOffset,
        loadPokemons,
    }
}


export default HomeViewModel