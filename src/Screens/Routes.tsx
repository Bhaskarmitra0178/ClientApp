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
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
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
                                title: 'LOG IN',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTitleAlign: 'center',
                                headerTintColor: '#fff',
                                headerRight: () => (
                                    <TouchableOpacity>
                                        <Text style={{color: '#fff'}} onPress={() => navigation.navigate('SignUp')}> Register </Text>               
                                    </TouchableOpacity>
                                ) 
                            })}
                            component={Login}
                         />
                        <Stack.Screen name="SignUp"
                            options={{
                                title: 'SIGN UP',
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            }}
                            component={Signup}
                         />

                        <Stack.Screen name="ForgotPassword"
                            options={{
                                title:'FOGOT PASSWORD',
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            }}
                            component={ForgotPassword}
                        /> 
                    </>
                ) :
                !props.user.hasAdditionalDetails ? (
                    <>
                        <Stack.Screen name="Contact Details"
                            options={{  
                                title: 'Contact Details',
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            }}
                            component={ContactDetails}/>
                        <Stack.Screen name="Billing Details" component={BillingDetails}/>
                        <Stack.Screen name="Application Fanout"
                            options={{
                                title: 'Application Fanout',
                                headerTitleAlign: 'center',
                                headerStyle:{
                                    backgroundColor: globalStyles.COLOR_PRIMARY
                                },
                                headerTintColor: '#fff'
                            }}
                            component={AppList}/> 
                    </>
                ) : (
                    <>
                        <Stack.Screen name="Home"
                            options={({route, navigation}) => ({
                                title: 'Home',
                                headerLeft: () => (
                                    <TouchableOpacity onPress={() => navigation.navigate('UserProfile')} >
                                        <View style={{padding: 10, borderRadius: 5}}>
                                            <Icon type='Entypo' style={{color: '#fff'}} name='user'/>               
                                        </View>
                                    </TouchableOpacity>
                                ),
                                headerRight: () => (
                                    <TouchableOpacity>
                                        <View style={{padding: 10}}>
                                            <Icon type='MaterialCommunityIcons' style={{color: '#fff'}} name='database-refresh'/>
                                        </View>
                                    </TouchableOpacity>
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
                                    <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                                        <View style={{padding: 10}}>
                                            <Icon type='FontAwesome' style={{color: '#fff'}} name='home' />
                                        </View>
                                    </TouchableOpacity>
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