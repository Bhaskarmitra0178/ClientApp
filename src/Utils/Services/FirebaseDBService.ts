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
/**
 * Fetch a document in firestore
 * @param collectionName 
 * @param docName 
 */
export const fetchDoc = (collectionName: string, docName: string) => {
    return firebase.firestore()
    .collection(collectionName)
    .doc(docName)
    .get()
}
/**
 * Return the collection instance.
 * @param collectionName 
 */
export const fetchCollectionInstance = (collectionName: string) => {
    return firebase.firestore()
        .collection(collectionName)
}
/**
 * Return the document instance
 * @param collectionName 
 * @param docName 
 */
export const fetchDocInstance = (collectionName: string, docName: string) => {
    return firebase.firestore()
        .collection(collectionName)
        .doc(docName)
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

export const createUserMapping = (userUID: string, payload: {applications: any, contactDetails: any}) => {
    return Promise.all([
        setContactDetails(userUID,payload.contactDetails),
        // setBillingDetails(userUID, payload.billingDetails),
        createApplicationUserMapping(userUID, payload.applications)
    ])
}