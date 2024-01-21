import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Species } from '../../Domain/Entities/Pokemon'
import { GetMoveDetailUseCase } from '../../Domain/UseCases/Moves/GetMoveDetailUseCase'
import { Move } from '../../Domain/Entities/Move'
import ImageColors from 'react-native-image-colors'
import { fixMove } from '../Utils/MoveFixer'
import { useNavigation } from '@react-navigation/native'
import { HomeStackParamList } from '../Navigators/HomeStackNavigator'
import { StackNavigationProp } from '@react-navigation/stack'

interface Props {
    move: Species,
    navigation: StackNavigationProp<HomeStackParamList, "MoveScreen">

}

const bug = require('../../assets/types_small/bug.png');
const dark = require('../../assets/types_small/dark.png');
const dragon = require('../../assets/types_small/dragon.png');
const electric = require('../../assets/types_small/electric.png');
const fairy = require('../../assets/types_small/fairy.png');
const fighting = require('../../assets/types_small/fighting.png');
const flying = require('../../assets/types_small/flying.png');
const fire = require('../../assets/types_small/fire.png');
const ghost = require('../../assets/types_small/ghost.png');
const grass = require('../../assets/types_small/grass.png');
const ground = require('../../assets/types_small/ground.png');
const ice = require('../../assets/types_small/ice.png');
const normal = require('../../assets/types_small/normal.png');
const poison = require('../../assets/types_small/poison.png');
const psychic = require('../../assets/types_small/psychic.png');
const rock = require('../../assets/types_small/rock.png');
const steel = require('../../assets/types_small/steel.png');
const water = require('../../assets/types_small/water.png');

export const PokemonMove = ({ navigation, move }: Props) => {

    const [moveDetail, setMoveDetail] = useState<Move>()
    const [bgColor, setBgColor] = useState('grey')
    const [textColor, setTextColor] = useState('black')


    const images: any = {
        bug,
        dark,
        dragon,
        electric,
        fairy,
        fighting,
        ghost,
        fire,
        grass,
        flying,
        ice,
        ground,
        normal,
        poison,
        psychic,
        rock,
        steel,
        water,
    }

    useEffect(() => {
        const urlParts = move.url.split('/');
        const id = urlParts[urlParts.length - 2]

        getMoveDetail(id)
    }, [])


    const getMoveDetail = async (id: string) => {
        const response = await GetMoveDetailUseCase(id)

        setMoveDetail(response)
        ImageColors.getColors(images[response.type.name],
            { fallback: '#000000' })
            .then((colors) => {
                if (colors.platform === 'android') {
                    setBgColor(colors.dominant || 'grey')
                    setTextColor(colors.lightMuted || 'grey')
                } else {
                    // @ts-ignore
                    setBgColor(colors.background || 'grey')
                    // @ts-ignore
                    setTextColor(colors.detail || 'grey')
                }
            })
    }




    return (
        <TouchableOpacity
            style={{ ...styles.container, backgroundColor: bgColor }}
            onPress={() => navigation.navigate("MoveScreen", { move: moveDetail! })}
            activeOpacity={0.5}
        >
            <Image
                source={images[moveDetail?.type.name!]}
                style={styles.moveImage}
            />

            {
                moveDetail?.name &&
                <Text style={{
                    ...styles.movementText,
                    color: textColor
                }}>
                    {fixMove(moveDetail?.name!)}
                </Text>
            }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginRight: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    moveImage: {
        height: 30,
        width: 30
    },
    movementText: {
        marginLeft: 5,
        fontWeight: 'bold',
        fontSize: 12
    }
});
