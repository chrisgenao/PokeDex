import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ActivityIndicator, Dimensions } from 'react-native'
import { HomeStackParamList } from '../../Navigators/HomeStackNavigator'
import Icon from 'react-native-vector-icons/Ionicons'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { FadeInImage } from '../../Components/FadeInImage'
import useViewModel from './ViewModel'
import { PokemonDetail } from '../../Components/PokemonDetail'
import { PokemonType } from '../../Components/PokemonType'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { fixMove } from '../../Utils/MoveFixer'


interface Props extends StackScreenProps<HomeStackParamList, "PokemonScreen"> { }

const FirstRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
    <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
});

export const PokemonScreen = ({ navigation, route }: Props) => {

    const { simplePokemon, color } = route.params;

    const { isLoading, pokemon } = useViewModel(simplePokemon.id)

    const { top, bottom } = useSafeAreaInsets()

    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
    ]);

    return (
        <View style={{ flex: 1 }}>
            <View style={{
                ...styles.headerContainer,
                backgroundColor: color,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.pop()}
                    activeOpacity={0.8}
                    style={{
                        ...styles.backButton,
                        top: top + 10
                    }}
                >
                    <Icon
                        name='arrow-back-outline'
                        color="white"
                        size={35}
                    />
                </TouchableOpacity>

                <View style={{ justifyContent: 'space-between', alignItems: 'center', top: top + 40, flexDirection: 'row' }}>

                    <View style={{ justifyContent: 'center', width: Dimensions.get("window").width / 2 }}>
                        <Text style={{
                            ...styles.pokemonName,
                        }}>
                            {fixMove(simplePokemon.name)}
                        </Text>

                        {
                            pokemon.types &&
                            <View style={{ alignItems: 'center' }}>
                                {
                                    pokemon.types.map(({ type }) => (
                                        <PokemonType navigation={navigation} type={type} />
                                    ))
                                }
                            </View>
                        }
                    </View>
                    <View style={{ marginRight: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 25 }}>#{simplePokemon.id}</Text>
                    </View>
                </View>


                <View style={styles.pokeballContainer}>
                    <Image
                        source={require('../../../assets/pokebola-blanca.png')}
                        style={styles.pokeballImage}
                    />
                </View>

                <FadeInImage
                    uri={simplePokemon.picture}
                    style={styles.pokemonImage}
                />
            </View>

            {/* Details */}
            {
                isLoading
                    ? (
                        <View style={styles.indicatorContent}>
                            <ActivityIndicator
                                color={color}
                                size={50}
                            />
                        </View>
                    )
                    :
                    <PokemonDetail navigation={navigation} pokemon={pokemon} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 370,
        zIndex: 999,
        borderBottomRightRadius: 1000,
        borderBottomLeftRadius: 1000,
        shadowColor: "#000",
        shadowOffset: {
            width: -5,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    backButton: {
        position: 'absolute',
        left: 20,
    },
    pokemonName: {
        color: 'white',
        fontSize: 35,
        // left: 20,
        textAlign: 'center'
    },
    // pokeballImage: {
    //     width: 250,
    //     height: 250,
    //     position:'absolute',
    //     bottom: 0,
    //     right: 0,
    //     opacity: 0.3
    // },
    pokeballContainer: {
        width: 250,
        height: 250,
        position: 'absolute',
        right: 0,
        bottom: 0,
    },
    pokeballImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: 30,
        opacity: 0.3,
    },
    pokemonImage: {
        width: 250,
        height: 250,
        position: 'absolute',
        bottom: -15,
        right: -5
    },
    indicatorContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        // marginTop: 20
        // left: 20
    },
});