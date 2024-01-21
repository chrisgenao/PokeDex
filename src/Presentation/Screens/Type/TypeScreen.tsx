import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import { Species } from '../../../Domain/Entities/Pokemon'

interface Props {
    type: Species
}

export const TypeScreen = ({ type }: Props) => {

    useEffect(() => {

    }, [])
    


    return (
        <View>
            <Text>
                TypeScreen
            </Text>
        </View>
    )
}
