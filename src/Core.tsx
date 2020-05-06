import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { StyleSheet } from 'react-native';
import { Splash } from './Screens/Splash';
import { fetchUserToken } from './Utils/Services/AuthService';
import { StoreModel } from './Redux/Model/Store.model';
import { Routes } from './Screens/Routes';

export const Core = () => {

    /**
     * Variables declared.
     */
    const dispatch = useDispatch()
    const user = useSelector((store: StoreModel) => store.user)

    /**
     * calls the authenticatedUser function to check the user state.
     */
    useEffect(() => {
        authenticateUser();
    }, [])

    
    /**
     * Checks for authenticated user.
     */
    const authenticateUser = async () => {
        try {
            const token = await fetchUserToken();
            if (token) {
                dispatch({type: 'RESTORE_TOKEN', payload: token});
            } else {
                dispatch({type: 'SIGN_OUT'});
            }
        } catch (error) {
            console.log(error);
            dispatch({type: 'SIGN_OUT'});
        }
    }
   
    /**
     * Display flash screen
     */
    if (user.isLoading) {
        // We haven't finished checking for the token yet
        return <Splash />;
    }

    return (
        <Routes user={user}/>
    )
}