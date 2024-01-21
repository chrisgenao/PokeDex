import { StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { HomeStackParamList } from '../../Navigators/HomeStackNavigator'

interface Props extends StackScreenProps<HomeStackParamList, "MoveScreen"> { }

export const MoveScreen = ({ navigation, route }: Props) => {

    const { move } = route.params

    return (
        <ScrollView>
            <Text>
                {JSON.stringify(move, null, 3)}
            </Text>
        </ScrollView>
    )
}
