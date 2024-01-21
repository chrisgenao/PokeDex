import React, { useEffect, useState } from 'react'
import { Dimensions, FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { SearchInput } from '../../Components/SearchInput';
import useViewModel from './ViewModel';
import { PokemonCard } from '../../Components/PokemonCard';
import { globalStyles } from '../../Theme/AppTheme';
import { StackScreenProps } from '@react-navigation/stack';
import { HomeStackParamList } from '../../Navigators/HomeStackNavigator';
import { Loading } from '../../Components/Loading';
import { SimplePokemon } from '../../../Data/Sources/Remote/Models/ResponsePokeAPI';

interface Props extends StackScreenProps<HomeStackParamList, any> { }

const screenWidth = Dimensions.get('window').width

export const SearchPokemonScreen = ({ navigation, route }: Props) => {

  const { top } = useSafeAreaInsets()

  const { isFetching, pokemonList } = useViewModel()

  const [filteredPokemon, setFilteredPokemon] = useState<SimplePokemon[]>([])

  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {

    if (searchTerm.length === 0) return setFilteredPokemon([])

    if (isNaN(Number(searchTerm))) {
      setFilteredPokemon(pokemonList.filter(poke => poke.name.toLowerCase().includes(searchTerm.toLowerCase())))
    } else {
      const pokemonById = pokemonList.find(poke => poke.id === searchTerm)
      setFilteredPokemon(
        (pokemonById) ? [pokemonById] : []
      )
    }
  }, [searchTerm])



  if (isFetching) {
    <Loading />
  }

  return (
    <View style={{
      flex: 1,
      marginHorizontal: 20,
    }}>

      <SearchInput
        onDebounce={(value) => setSearchTerm(value)}
        style={{
          position: 'absolute',
          zIndex: 999,
          width: screenWidth - 40,
          top: Platform.OS === 'ios' ? top : top + 30
        }}
      />

      <FlatList
        data={filteredPokemon}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <PokemonCard navigation={navigation} pokemon={item} />
        )}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={(
          <Text
            style={{
              ...globalStyles.title,
              ...globalStyles.globalMargin,
              marginTop: Platform.OS === 'ios' ? top + 60 : top + 80,
              paddingBottom: 10
            }}>
            {searchTerm}</Text>
        )}
      />

    </View >
  )
}

const styles = StyleSheet.create({

});