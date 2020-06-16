import { AsyncStorage, Platform } from "react-native";
import * as firebase from 'firebase';
import 'firebase/firestore';
    
/**
 * This function fetches the user token from the application.
 */
export async function fetchUserToken() {
    try {
        const token = await AsyncStorage.getItem('userToken');
        return token
    } catch (error) {
        return null;   
    }
}

/**
 * Validates the email
 * @param email 
 */
export const emailValidator = (email: string) => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';
  
    return '';
};
  
/**
 * Validates the empty field
 * @param password 
 */
export const emptyFieldValidator = (field: string) => {
    if (!field || field.length <= 0) return `This field cannot be empty.`;
  
    return '';
};

/**
 * Validates the confirm password field
 * @param password 
 */
export const confirmPasswordValidator = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) return 'Password and confirm password didn\'t match'; 
    return '';
}

/**
 * Checks whether any authentication fields have error
 * @param field 
 * @param text
 * @param otherParams
 */
export const hasError = (field: string, text: string, otherParams?: {password: string}) => {
    switch(field) {
        case 'login.email':
        case 'signup.email':     
        case 'forget_password.email':     
            return !!emailValidator(text);
        case 'login.password':
        case 'signup.password':
        case 'signup.company':
        case 'contactDetails.name':     
            return !!emptyFieldValidator(text);
        case 'signup.confirm_password':
            return !!emptyFieldValidator(text) && !!confirmPasswordValidator(text, otherParams!.password);                        
        default:
            return false;    
    }
}

/**
 * This function calls the registration api from the firebase
 * @params payload
 */
export const registerUser = (payload: {email: string, password: string}) => {
    return firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
} 
/**
 * This function calls the registration api from the firebase
 * @params payload
 */
export const loginUser = (payload: {email: string, password: string}) => {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
            return firebase.auth().signInWithEmailAndPassword(payload.email, payload.password);
        })
}

/**
 * Reset password
 * @param payload 
 */
export const resetPassword = (payload: {email: string}) => {
    return firebase.auth().sendPasswordResetEmail(payload.email);
}
/**
 * Sets the additional user details
 * @param payload 
 */
export const setUserAdditionalDetails = (payload: { userUID: string, company: string }) => {
    return firebase.firestore()
        .collection("Users")
        .doc(payload.userUID)
        .set({
            "Company Name": payload.company,
            "CreatedOn": firebase.database.ServerValue.TIMESTAMP,
            "Last Logon": firebase.database.ServerValue.TIMESTAMP,
            "OS": Platform.OS
        })
}

/**
 * Checks whether the current user has any contact details
 * @param payload 
 */
export const checkContactDetails = async (payload: {userUID: string}) => {
    return await firebase.firestore()
    .collection("Users")
    .doc(payload.userUID)
    .collection('Contact Info')
    .limit(1)
    .get()
}

/**
 * Sets the current user contact details
 * @param userUID 
 * @param payload 
 */
export const setContactDetails = (userUID: string, payload: {name: string, telephone: string}) => {
    return firebase.firestore()
    .collection("Users")
    .doc(userUID)
    .collection('Contact Info')
    .add({
        "Email": firebase.auth().currentUser?.email,
        'Name': payload.name,
        "Telephone": payload.telephone
    })
}

/**
 * Checks whether the current user has any billing details
 * @param payload 
 */
export const checkBillingDetails = async (payload: {userUID: string}) => {
    return await firebase.firestore()
    .collection("Users")
    .doc(payload.userUID)
    .collection('Billing Info')
    .limit(1)
    .get()
}

/**
 * Sets the current user billing details
 * @param userUID 
 * @param payload 
 */
export const setBillingDetails = (userUID: string, payload: {billingAddress: string, ccNumber: string, cvvNumber: string}) => {
    return firebase.firestore()
    .collection("Users")
    .doc(userUID)
    .collection('Billing Info')
    .add({
        "Billing Addr": payload.billingAddress,
        "CC": payload.ccNumber,
        "Code": payload.cvvNumber
    })
}

/**
 * Checks whether the current user has any billing details
 * @param payload 
 */
export const checkApplicationDetails = async (payload: {userUID: string}) => {
    return await firebase.firestore()
    .collection("Users")
    .doc(payload.userUID)
    .collection('Applications')
    .limit(1)
    .get()
}
/**
 * Create the user application page mapping
 * @param userID 
 * @param applicationList 
 */
export const createApplicationUserMapping = (userID: string, applicationList: Array<any>) => {
    const batch = firebase.firestore().batch()
    applicationList.forEach((doc: any) => {
        const docRef = firebase.firestore()
            .collection("Users")
            .doc(userID)
            .collection('Applications')
            .doc(doc.id);
        batch.set(docRef, {"Status": "Active", "TimeStamp": firebase.database.ServerValue.TIMESTAMP});
      });
    return batch.commit();  
}

export const updateApplicationMapping = (userID: string, applicationList: Array<any>) => {
    const batch = firebase.firestore().batch()
    return firebase.firestore()
    .collection("Users")
    .doc(userID)
    .collection('Applications')
    .get()
    .then((res:any) => {
        res.forEach((element: any) => {
            element.ref.delete();
        });
        return true;
    })
    .then((payload: boolean) => {
        if (payload) {
            applicationList.forEach((doc: any) => {
                const docRef = firebase.firestore()
                    .collection("Users")
                    .doc(userID)
                    .collection('Applications')
                    .doc(doc.id);
                batch.set(docRef, {"Status": "Active", "TimeStamp": firebase.database.ServerValue.TIMESTAMP});
              });
        }
    })
    .catch((error: any) => console.log(error))
    .finally(() => {
        return batch.commit();  
    })
}

export const updateUsercontactInfo = (userUID: string,contactInfoID: string, payload: any) => {
    return firebase.firestore()
    .collection('Users')
    .doc(userUID)
    .collection('Contact Info')
    .doc(contactInfoID)
    .set({
        Name: payload.name,
        Telephone: payload.telephone
    }, {merge: true})
}