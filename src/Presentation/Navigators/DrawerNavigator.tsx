import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { HomeStackNavigator } from './HomeStackNavigator'



export const DrawerNavigator = () => {

    const Drawer = createDrawerNavigator()

    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Drawer.Screen name={"HomeStack"} component={HomeStackNavigator} />
        </Drawer.Navigator>
    )
}
