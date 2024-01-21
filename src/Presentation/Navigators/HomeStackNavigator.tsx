import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeScreen } from '../Screens/Home/HomeScreen';
import { PokemonScreen } from '../Screens/Pokemon/PokemonScreen'
import { SimplePokemon } from '../../Data/Sources/Remote/Models/ResponsePokeAPI';
import { SearchPokemonScreen } from '../Screens/Search/SearchPokemonScreen';
import { MoveScreen } from '../Screens/Move/MoveScreen';
import { Move } from '../../Domain/Entities/Move';
import { TypeScreen } from '../Screens/Type/TypeScreen';
import { Species } from '../../Domain/Entities/Pokemon';

export type HomeStackParamList = {
    HomeScreen: undefined,
    PokemonScreen: { simplePokemon: SimplePokemon, color: string },
    SearchPokemonScreen: undefined,
    MoveScreen: { move: Move },
    TypeScreen: { type: Species }
}

export const HomeStackNavigator = () => {

    const Stack = createStackNavigator<HomeStackParamList>()
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: 'white'
                }
            }}
        >
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='PokemonScreen' component={PokemonScreen} />
            <Stack.Screen name='SearchPokemonScreen' component={SearchPokemonScreen} />
            <Stack.Screen name='MoveScreen' component={MoveScreen} />
            <Stack.Screen name='TypeScreen' component={TypeScreen} />
        </Stack.Navigator>
    )
}
