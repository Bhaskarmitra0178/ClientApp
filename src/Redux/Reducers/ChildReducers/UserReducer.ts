import { SIGN_IN, SIGN_OUT, SET_LOADING, SET_LOCAL_CONTACT_STORAGE, SET_LOCAL_BILLING_STORAGE, HAS_ADDITIONAL_DATA} from '../../Actions/AuthAction';
import { AuthActionModel } from '../../Model/AuthAction.model';

/**
 * Intial state of the authentication reducer model
 */
export interface AuthInitialState {
    userDetails: any | null,
    hasAdditionalDetails: boolean,
    isSignOut: boolean;
    isLoading: boolean;
    localContactDetails: any,
    localBillingDetails: any
}

/**
 * Initial value of the state
 */
export const authIntialState: AuthInitialState = {
    userDetails: null,
    hasAdditionalDetails: false,
    isSignOut: false,
    isLoading: true,
    localBillingDetails: null,
    localContactDetails: null
}

/**
 * Reducer logic.
 */
export default (state = authIntialState, action: AuthActionModel ) => {
    switch (action.type) {
     case SIGN_IN:
        return {
            ...state,
            accessToken: action.payload.accessToken,
            userDetails:action.payload.userDetails,
            hasAdditionalDetails: action.payload.hasAdditionalDetails,
            isSignOut: false,
            isLoading: false
        }
     case SET_LOADING:
        return {
            ...state,
            isLoading: action.payload.loading
        } 
     case SIGN_OUT:
      return {
            accessToken: null,
            userDetails: null,
            isSignOut: true,
            isLoading: false
      }
     case SET_LOCAL_CONTACT_STORAGE: 
        return {
           ...state,
           localContactDetails: action.payload
        };
     case SET_LOCAL_BILLING_STORAGE: 
        return {
            ...state,
            localBillingDetails: action.payload
        }   
     case HAS_ADDITIONAL_DATA: 
        return {
            ...state,
            hasAdditionalDetails: action.payload
        }   
     default:
      return state
    }
}