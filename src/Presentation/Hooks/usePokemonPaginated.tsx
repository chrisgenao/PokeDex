import { useEffect, useRef, useState } from "react"
import { ResponsePokeAPI, Result, SimplePokemon } from "../../Data/Sources/Remote/Models/ResponsePokeAPI"
import { PokemonAPI } from "../../Data/Sources/Remote/API/PokeAPI"

export const usePokemonPaginated = () => {

    const nextPageUrl = useRef('https://pokeapi.co/api/v2/pokemon?limit=40')

    const [isLoading, setIsLoading] = useState(true)
    const [pokemonList, setPokemonList] = useState<SimplePokemon[]>([])


    const mapPokemonList = (_pokemonList: Result[]) => {

        const newPokemonList: SimplePokemon[] = _pokemonList.map(({ name, url }) => {

            const urlParts = url.split('/');
            const id = urlParts[urlParts.length - 2]
            const picture = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`

            return { id, picture, name }

        })

        setPokemonList([...pokemonList, ...newPokemonList])
        setIsLoading(false)
    }


    useEffect(() => {
        loadPokemons()
    }, [])

    const loadPokemons = async () => {

        const response = await PokemonAPI.get<ResponsePokeAPI>(nextPageUrl.current)
        nextPageUrl.current = response.data.next
        setIsLoading(true)
        mapPokemonList(response.data.results)

        // console.log(pokemonList[0].picture)
        // console.log(JSON.stringify(response, null, 3))
    }


    return {
        pokemonList,
        isLoading,
        loadPokemons
    }
}
