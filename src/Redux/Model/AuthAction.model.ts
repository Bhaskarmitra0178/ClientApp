/**
 * Action model for Authentication.
 */
export interface AuthActionModel {
    type: 'SIGN_IN' | 'SIGN_OUT' | 'SET_LOADING' | 'SET_LOCAL_CONTACT_STORAGE' | 'SET_LOCAL_BILLING_STORAGE' | 'HAS_ADDITIONAL_DATA',
    payload: {
        accessToken?: string | null;
        userDetails?: {
            userName: string,
            email: string;
        } | null,
        loading?: boolean
        hasAdditionalDetails?: boolean
    }
}