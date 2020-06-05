import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Splash } from './Screens/Splash';
import { checkContactDetails, checkBillingDetails, checkApplicationDetails } from './Utils/Services/AuthService';
import { StoreModel } from './Redux/Model/Store.model';
import { Routes } from './Screens/Routes';
import * as firebase from 'firebase';
import * as RootNavigation from './Utils/Configurations/NavigationRef';


export const Core = (props: any) => {
    /**
     * Variables declared.
     */
    const dispatch = useDispatch()
    const user = useSelector((store: StoreModel) => store.user)

    /**
     * calls the authenticatedUser function to check the user state.
     */
    useEffect(() => 
    {
        const authenticationUnsubscribe = firebase.auth().onAuthStateChanged(async (user: any) => {
            if (user) {
                
                const checkUserContactDetails = await checkContactDetails({userUID: user.uid})
                if (checkUserContactDetails.size) {
                    dispatch({type: 'SIGN_IN', payload: {userDetails: user, hasAdditionalDetails: true}})
                } else {
                    dispatch({type: 'SIGN_IN', payload: {userDetails: user, hasAdditionalDetails: false}})
                } 
            } else {
                dispatch({type: 'SIGN_OUT'});
            } 
        });

        return () => {
            authenticationUnsubscribe();    
        }
    }, [])

    /**
     * Display flash screen
     */
    if (user.isLoading) {
        // We haven't finished checking for the token yet
        return <Splash />;
    }

    return (
        <Routes user={user} />
    )
}