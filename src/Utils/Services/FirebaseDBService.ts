import * as firebase from 'firebase';
import 'firebase/firestore';
import { setContactDetails, setBillingDetails, createApplicationUserMapping } from './AuthService';

/**
 * This function fetches the firebase collection
 * @param collectionName 
 */
export const fetchCollection = (collectionName: string) => {
    return firebase.firestore()
        .collection(collectionName)
        .get()
}

export const fetchDoc = (collectionName: string, docName: string) => {
    return firebase.firestore()
    .collection(collectionName)
    .doc(docName)
    .get()
}
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
        .collection('Applications')
        .get()
        .then((applicationSnapShot: any) => {
            const applicationIDs = applicationSnapShot.docs.map((doc: any) => doc.id)
            return firebase.firestore()
            .collection('ApplicationFanout')
            .where(firebase.firestore.FieldPath.documentId(),'in', applicationIDs)
            .get()
        })

}

export const createUserMapping = (userUID: string, payload: {applications: any, contactDetails: any, billingDetails: any}) => {
    return Promise.all([
        setContactDetails(userUID,payload.contactDetails),
        setBillingDetails(userUID, payload.billingDetails),
        createApplicationUserMapping(userUID, payload.applications)
    ])
}