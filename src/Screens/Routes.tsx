import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { Clients } from './Common/Clients';
import { Client } from './Common/Client';

export const Routes = (props: any) => {

    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            {
                props.user.isSignOut ?
                (
                    <>
                        <Stack.Screen name="SignIn" component={Login} />
                        <Stack.Screen name="SignUp" component={Signup} />
                    </>
                ) :
                (
                    <>
                        <Stack.Screen name="Home" component={Clients} />
                        <Stack.Screen name="Profile" component={Client} />
                    </>
                )
            }
        </Stack.Navigator>
         
    )
}