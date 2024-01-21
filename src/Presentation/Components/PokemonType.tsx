import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Species } from '../../Domain/Entities/Pokemon';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../Navigators/HomeStackNavigator';

const bug = require('../../assets/types/bug.png');
const dark = require('../../assets/types/dark.png');
const dragon = require('../../assets/types/dragon.png');
const electric = require('../../assets/types/electric.png');
const fairy = require('../../assets/types/fairy.png');
const flying = require('../../assets/types/flying.png');
const fighting = require('../../assets/types/fighting.png');
const fire = require('../../assets/types/fire.png');
const ghost = require('../../assets/types/ghost.png');
const grass = require('../../assets/types/grass.png');
const ground = require('../../assets/types/ground.png');
const ice = require('../../assets/types/ice.png');
const normal = require('../../assets/types/normal.png');
const poison = require('../../assets/types/poison.png');
const psychic = require('../../assets/types/psychic.png');
const rock = require('../../assets/types/rock.png');
const steel = require('../../assets/types/steel.png');
const water = require('../../assets/types/water.png');
const stellar = require('../../assets/types/stellar.png');

interface Props {
    type: Species,
    navigation: StackNavigationProp<HomeStackParamList, any>
}

export const PokemonType = ({ navigation, type }: Props) => {
    const images: any = {
        bug,
        dark,
        dragon,
        electric,
        fairy,
        fighting,
        flying,
        ghost,
        grass,
        ice,
        fire,
        ground,
        normal,
        poison,
        psychic,
        rock,
        steel,
        water,
        stellar,
    }

    return (

        <TouchableOpacity
            activeOpacity={0.5}
            style={styles.container}
            key={type.name}
            onPress={() => navigation.navigate('TypeScreen', { type })}
        >

            {
                type &&
                <Image source={images[type.name]} />
            }
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    container: {
        // marginTop: 5,
        // backgroundColor: 'red',
        // width: 300,
        // height: 300,
        marginRight: 5
    },
    regularText: {
        fontSize: 19
    },
    // typeImage: {
    //     width: 10,
    //     height: 40
    // }
});