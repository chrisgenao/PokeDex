import React, { useEffect, useState } from 'react'
import { Platform, StyleProp, StyleSheet, TextInput, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { useDebounceValue } from '../Hooks/useDebounceValue';

interface Props {
    onDebounce: (value: string) => void
    style?: StyleProp<ViewStyle>
}

export const SearchInput = ({ style, onDebounce }: Props) => {

    const [textValue, setTextValue] = useState('')

    const debouncedValue = useDebounceValue(textValue)

    useEffect(() => {
        onDebounce(debouncedValue)
    }, [debouncedValue])


    return (
        <View style={{
            ...styles.container,
            ...style as any
        }}>
            <View style={styles.background}>
                <TextInput
                    placeholder='Buscar Pokémon'
                    autoCapitalize='none'
                    autoCorrect={false}
                    style={{
                        ...styles.textInput,
                        top: Platform.OS === 'ios' ? 0 : 2
                    }}
                    value={textValue}
                    onChangeText={setTextValue}
                />
                <Icon
                    name='search-outline'
                    color="grey"
                    size={25}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
    },
    background: {
        backgroundColor: '#F3F1F3',
        borderRadius: 50,
        height: 40,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,

    },
    textInput: {
        flex: 1,
        fontSize: 16,
    }
});