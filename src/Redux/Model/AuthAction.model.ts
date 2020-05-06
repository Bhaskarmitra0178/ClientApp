/**
 * Action model for Authentication.
 */
export interface AuthActionModel {
    type: 'SIGN_IN' | 'SIGN_OUT' | 'RESTORE_TOKEN',
    payload: {
        accessToken?: string | null;
        userDetails?: {
            userName: string,
            email: string;
        } | null,
    }
}