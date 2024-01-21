import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import { SimplePokemon } from '../../Data/Sources/Remote/Models/ResponsePokeAPI'
import { FadeInImage } from './FadeInImage'
import ImageColors from "react-native-image-colors"
import { StackNavigationProp } from '@react-navigation/stack'
import { HomeStackParamList } from '../Navigators/HomeStackNavigator'
import { fixMove } from '../Utils/MoveFixer'

interface Props {
    pokemon: SimplePokemon,
    navigation: StackNavigationProp<HomeStackParamList, "HomeScreen">
}

const windowWidth = Dimensions.get('window').width

export const PokemonCard = ({ navigation, pokemon }: Props) => {

    const [bgColor, setBgColor] = useState('grey')
    const isMounted = useRef(true)

    useEffect(() => {
        ImageColors.getColors(pokemon.picture, { fallback: '#000000' })
            .then((colors) => {

                if (!isMounted.current) return

                (colors.platform === 'android')
                    ? setBgColor(colors.dominant || 'grey')
                    // @ts-ignore
                    : setBgColor(colors.background || 'grey')

            })

        return () => {
            isMounted.current = false
        }
    }, [])


    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => { navigation.navigate("PokemonScreen", { simplePokemon: pokemon, color: bgColor }) }}
        >
            <View style={{
                ...styles.container,
                width: windowWidth * 0.4,
                backgroundColor: bgColor
            }}
            >
                <View>
                    <Text style={styles.pokemonName}>
                        {fixMove(pokemon.name)}
                        {'\n#' + pokemon.id}
                    </Text>
                </View>

                <View style={styles.pokeballContainer}>
                    <Image
                        source={require('../../assets/pokebola-blanca.png')}
                        style={styles.pokeballImage} />
                </View>

                <FadeInImage
                    uri={pokemon.picture}
                    style={styles.pokemonImage}
                />

            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        height: 120,
        width: 160,
        marginBottom: 25,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    pokemonName: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        top: 20,
        left: 10
    },
    pokemonImage: {
        width: 120,
        height: 120,
        position: 'absolute',
        right: -8,
        bottom: -5
    },
    pokeballContainer: {
        width: 100,
        height: 100,
        position: 'absolute',
        left: 0,
        bottom: 0,
        overflow: 'hidden',
    },
    pokeballImage: {
        width: 100,
        height: 100,
        position: 'absolute',
        bottom: -30,
        left: -20,
        opacity: 0.3,
    },
});