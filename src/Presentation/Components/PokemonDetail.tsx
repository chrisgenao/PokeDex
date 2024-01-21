import React from 'react'
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Pokemon } from '../../Domain/Entities/Pokemon'
import { globalStyles } from '../Theme/AppTheme';
import { FadeInImage } from './FadeInImage';
import { PokemonType } from './PokemonType';
import { PokemonMove } from './PokemonMove';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../Navigators/HomeStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    pokemon: Pokemon,
    navigation: StackNavigationProp<HomeStackParamList, any>

}

export const PokemonDetail = ({ navigation, pokemon }: Props) => {
    return (

        <ScrollView style={{
            ...StyleSheet.absoluteFillObject,
        }}
            showsVerticalScrollIndicator={false}
        >

            {/* Types y peso */}
            <View style={{
                ...styles.container,
                marginTop: 380
            }}>

                {/* Peso */}

                <Text style={styles.title}>Peso</Text>
                {/* TODO: Cambiar con el localStorage */}
                <Text style={styles.regularText}>{pokemon.weight * 0.22}lb</Text>

            </View>

            {/* Sprites */}
            <View style={{
                ...styles.container
            }}>
                <Text style={styles.title}>Sprites</Text>
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            // style={ }
            >

                <FadeInImage uri={pokemon.sprites.front_default} style={styles.basicSprite} />
                <FadeInImage uri={pokemon.sprites.back_default} style={styles.basicSprite} />
                <View>
                    <Icon name='sparkles' color={'yellow'} size={30} style={{
                        position: 'absolute',
                        right: 20,
                        top: 5,
                        zIndex: 99
                    }} />
                    <FadeInImage uri={pokemon.sprites.front_shiny} style={styles.basicSprite} />
                </View>
                <View>
                    <Icon name='sparkles' color={'yellow'} size={30} style={{
                        position: 'absolute',
                        right: 20,
                        top: 5,
                        zIndex: 99,
                    }} />
                    <FadeInImage uri={pokemon.sprites.back_shiny} style={styles.basicSprite} />
                </View>
            </ScrollView>

            {/* Habilidades */}
            <View style={{
                ...styles.container,
            }}>

                <Text style={styles.title}>Habilidades Base</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                    {
                        pokemon.abilities.map(({ ability }) => (
                            // <Text
                            //     style={{
                            //         ...styles.regularText,
                            //         marginRight: 10
                            //     }}
                            //     key={ability.name}
                            // >
                            //     {ability.url}
                            // </Text>

                            <PokemonMove navigation={navigation} move={ability} />

                        ))
                    }
                </View>

            </View>

            {/* Movimientos */}
            <View style={{
                ...styles.container,
            }}>

                <Text style={styles.title}>Movimientos</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
                    {
                        pokemon.moves.map(({ move }) => (

                            <PokemonMove navigation={navigation} move={move} />
                            // <Text
                            //     style={{
                            //         ...styles.regularText,
                            //         marginRight: 10
                            //     }}
                            //     key={move.name}
                            // >
                            //     {move.name}
                            // </Text>
                        ))
                    }
                </View>

            </View>

            {/* Stats */}
            <View style={{
                ...styles.container,
            }}>

                <Text style={styles.title}>Stats</Text>
                <View>
                    {
                        pokemon.stats.map((stat, index) => (
                            <View
                                style={{ flexDirection: 'row' }}
                                key={stat.stat.name + index}>
                                <Text
                                    style={{
                                        ...styles.regularText,
                                        marginRight: 10,
                                        width: 180,
                                        fontWeight: 'bold'
                                    }}
                                    key={stat.stat.name}
                                >
                                    {stat.stat.name}:
                                </Text>

                                <Text
                                    style={{
                                        ...styles.regularText,
                                        marginRight: 10
                                    }}
                                    key={stat.base_stat}
                                >
                                    {stat.base_stat}
                                </Text>
                            </View>
                        ))
                    }
                </View>

            </View>

            {/* Sprite Final */}
            <View style={{
                marginBottom: 20,
                alignItems: 'center'
            }}>
                <FadeInImage uri={pokemon.sprites.front_default} style={{ ...styles.basicSprite, opacity: 0.3 }} />
            </View>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20
    },
    regularText: {
        fontSize: 19
    },
    basicSprite: {
        width: 100,
        height: 100
    }
});