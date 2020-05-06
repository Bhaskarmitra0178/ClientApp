import { SIGN_IN, SIGN_OUT, RESTORE_TOKEN} from '../../Actions/AuthAction';
import { AuthActionModel } from '../../Model/AuthAction.model';

/**
 * Intial state of the authentication reducer model
 */
export interface AuthInitialState {
    accessToken: string | null;
    userDetails: {
        userName: string,
        email: string;
    } | null,
    isSignOut: boolean;
    isLoading: boolean;
}

/**
 * Initial value of the state
 */
export const authIntialState: AuthInitialState = {
    accessToken: null,
    userDetails: null,
    isSignOut: false,
    isLoading: true
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
        isSignOut: false
      }
     case SIGN_OUT:
      return {
       accessToken: null,
       userDetails: null,
       isSignOut: true,
       isLoading: false
      }
     case RESTORE_TOKEN:
      return {
       ...state,
       accessToken: action.payload.accessToken,
       userDetails: action.payload.userDetails,
       isLoading: false
      }
     default:
      return state
    }
}