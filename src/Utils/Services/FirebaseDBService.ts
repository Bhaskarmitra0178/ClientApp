import * as firebase from 'firebase';
import 'firebase/firestore';
import { setContactDetails, setBillingDetails, createApplicationUserMapping } from './AuthService';

export const fetchApplicationList = () => {
    return firebase.firestore()
        .collection('ApplicationFanout')
}

/**
 * This function takes the reference of the application list.
 */
export const userApplicationList = (userUID: string) => {
    return firebase.firestore()
        .collection('Users')
        .doc(userUID)
        .collection('Applications');
}

export const createUserMapping = (userUID: string, payload: {applications: any, contactDetails: any, billingDetails: any}) => {
    return Promise.all([
        setContactDetails(userUID,payload.contactDetails),
        setBillingDetails(userUID, payload.billingDetails),
        createApplicationUserMapping(userUID, payload.applications)
    ])
}