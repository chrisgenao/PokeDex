import { StackScreenProps } from '@react-navigation/stack'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Button, FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { globalStyles } from '../../Theme/AppTheme';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { GetPokemonsPaginatedUseCase } from '../../../Domain/UseCases/Pokemon/GetPokemonsPaginatedUseCase';
import { Result, SimplePokemon } from '../../../Data/Sources/Remote/Models/ResponsePokeAPI';
import { FadeInImage } from '../../Components/FadeInImage';
import { PokemonCard } from '../../Components/PokemonCard';
import { HomeStackParamList } from '../../Navigators/HomeStackNavigator';
import useViewModel from './ViewModel';


interface Props extends StackScreenProps<HomeStackParamList, "HomeScreen"> { }

export const HomeScreen = ({ navigation, route }: Props) => {

    const { top, bottom } = useSafeAreaInsets()


    const { pokemonList, currentOffset, loadPokemons } = useViewModel()



    return (
        <>
            <Image
                source={require('../../../assets/pokebola.png')}
                style={globalStyles.pokeballBackground}
            />

            <View
                style={{
                    alignItems: 'center'
                }}
            >

                <FlatList
                    data={pokemonList}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <PokemonCard navigation={navigation} pokemon={item} />
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReachedThreshold={0.4}
                    onEndReached={() => {
                        currentOffset.current = currentOffset.current + 40
                        loadPokemons(currentOffset.current)
                    }}
                    ListHeaderComponent={(
                        <Text
                            style={{
                                ...globalStyles.title,
                                ...globalStyles.globalMargin,
                                top: top + 20,
                                marginBottom: top + 20,
                                paddingBottom: 10
                            }}>
                            PokeDex</Text>
                    )}
                    ListFooterComponent={(
                        <ActivityIndicator
                            style={{ height: 100 }}
                            size={20}
                            color={'grey'} />
                    )}
                />
            </View>

            <TouchableOpacity
                onPress={() => { navigation.navigate("SearchPokemonScreen") }}
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    width: 60,
                    height: 60,
                    zIndex: 999,
                    position: 'absolute',
                    bottom: bottom + 20,
                    right: 40,
                    borderRadius: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,
                }}>

                <Icon name={'search-outline'} size={30} />

            </TouchableOpacity>
        </>
    )
}
