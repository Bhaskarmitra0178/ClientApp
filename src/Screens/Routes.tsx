import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { GenericList } from './Common/GenericList';
import { Client } from './Common/Client';
import { ForgotPassword } from './Authentication/ForgotPassword';
import {  Text, Icon, List } from 'native-base';
import { UserProfile } from './Common/UserProfile';
import { ContactDetails } from './Common/PostAuthentication/ContactDetails';
import { BillingDetails } from './Common/PostAuthentication/BillingDetails';
import { AppList } from './Common/PostAuthentication/AppList';
import { globalStyles } from '../Utils/Data/Styles';
import { View } from 'react-native';
import GenericListItems from './Common/GenericListItems';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Search } from './Common/Search';
import { SearchDetails } from './Common/SearchDetails';


export const Routes = (props: any) => {
 
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator>
            {
                props.user.isSignOut ?
                (
                    <>
                        <Stack.Screen name="SignIn"
                            options={({route, navigation}) => ({
                                headerTitle: () => (
                                    <Text>
                                        <Icon android='md-log-in' ios='ios-log-in' fontSize={6} /> &nbsp;
                                        LOG IN
                                    </Text>
                                ),
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                    <Text onPress={() => navigation.navigate('SignUp')}> Register </Text>               
                                ) 
                            })}
                            component={Login}
                         />
                        <Stack.Screen name="SignUp"
                            options={{
                                headerTitle: () => (
                                    <Text>
                                        <Icon type='Entypo' android='md-person' ios='ios-person' fontSize={6} /> &nbsp;
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
                    <>
                        <Stack.Screen name="Home"
                            options={({route, navigation}) => ({
                                title: 'Home',
                                headerLeft: () => (
                                    <TouchableHighlight onPress={() => navigation.navigate('UserProfile')} >
                                        <View style={{padding: 10, borderRadius: 5}}>
                                            <Icon type='Entypo' style={{color: '#fff'}} name='user'/>               
                                        </View>
                                    </TouchableHighlight>
                                ),
                                headerRight: () => (
                                    <TouchableHighlight>
                                        <View style={{padding: 10}}>
                                            <Icon type='MaterialCommunityIcons' style={{color: '#fff'}} name='database-refresh'/>
                                        </View>
                                    </TouchableHighlight>
                                ),
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            })} 
                            component={GenericList}
                        />
                        <Stack.Screen name="UserProfile"
                            options={({route, navigation}) => ({
                                title: 'Profile',
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            })} 
                            component={UserProfile}
                        />
                        <Stack.Screen name="ApplicationDetails"
                            options={({route, navigation} : any) => ({
                                title: `${route.params && route.params.application.Name || 'ApplicationDetails'}`,
                                headerTitleAlign: 'center',
                                headerLeft: () => (
                                    <TouchableHighlight onPress={() => navigation.navigate('Home')}>
                                        <View style={{padding: 10}}>
                                            <Icon type='FontAwesome' style={{color: '#fff'}} name='home' />
                                        </View>
                                    </TouchableHighlight>
                                ),
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            })} 
                            component={GenericListItems}
                        />
                        <Stack.Screen name="Search"
                            options={({route, navigation} : any) => ({
                                title: `${route.params && route.params.details || 'Search'}`,
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            })} 
                            component={Search}
                        />
                        <Stack.Screen name="SearchDetails"
                            options={({route, navigation} : any) => ({
                                title: `${route.params && route.params.appName || 'Search Details'}`,
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            })} 
                            component={SearchDetails}
                        />
                    </>   
                )
            }
        </Stack.Navigator>
         
    )
}