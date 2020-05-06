import { AsyncStorage } from "react-native";

    
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
 * Checks whether any authentication fields have error
 * @param field 
 */
export const hasError = (field: string, text: string) => {
    switch(field) {
        case 'login.email':
            return !!emailValidator(text);
        case 'login.password':
            return !!emptyFieldValidator(text);
        default:
            return false;    
    }
}