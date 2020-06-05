import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { GenericList } from './Common/GenericList';
import { Client } from './Common/Client';
import { ForgotPassword } from './Authentication/ForgotPassword';
import {  Text, Icon, List } from 'native-base';
import { UserProfile } from './Common/UserProfile';
import * as RootNavigation from '../Utils/Configurations/NavigationRef';
import { ContactDetails } from './Common/PostAuthentication/ContactDetails';
import { BillingDetails } from './Common/PostAuthentication/BillingDetails';
import { AppList } from './Common/PostAuthentication/AppList';


export const Routes = (props: any) => {
 
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            {
                props.user.isSignOut ?
                (
                    <>
                        <Stack.Screen name="SignIn"
                            options={{
                                headerTitle: () => (
                                    <Text>
                                        <Icon android='md-log-in' ios='ios-log-in' fontSize={6} /> &nbsp;
                                        LOG IN
                                    </Text>
                                ),
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                <Text onPress={() => RootNavigation.navigate('SignUp')}> Register </Text>               
                                ) 
                            }}
                            component={Login}
                         />
                        <Stack.Screen name="SignUp"
                            options={{
                                headerTitle: () => (
                                    <Text>
                                        <Icon android='md-person' ios='ios-person' fontSize={6} /> &nbsp;
                                        SIGN UP
                                    </Text>
                                ),
                                headerTitleAlign: 'center',
                            }}
                            component={Signup}
                         />

                        <Stack.Screen name="ForgotPassword"
                            options={{
                                headerTitle: () => (
                                    <Text>
                                        <Icon android='md-key' ios='ios-key' fontSize={6} /> &nbsp;
                                        FOGOT PASSWORD
                                    </Text>
                                ),
                                headerTitleAlign: 'center',
                            }}
                            component={ForgotPassword}
                        /> 
                    </>
                ) :
                !props.user.hasAdditionalDetails ? (
                    <>
                        <Stack.Screen name="Contact Details" component={ContactDetails}/>
                        <Stack.Screen name="Billing Details" component={BillingDetails}/>
                        <Stack.Screen name="Application Fanout" component={AppList}/> 
                    </>
                ) : (
                    <Stack.Screen name="Home"
                        options={(props: any) => ({
                            title: 'Home',
                            headerLeft: () => (
                                <Icon android='md-person' ios='ios-person' onPress={() => RootNavigation.navigate('UserProfile')}/>               
                            ),
                            headerRight: () => (
                                <Icon android='md-db' ios='ios-db' />
                            )
                        })} 
                        component={(props: any) => <GenericList {...props} home={true}/>}
                    />
                )
            }
        </Stack.Navigator>
         
    )
}