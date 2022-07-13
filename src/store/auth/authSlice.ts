import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type statusState={ status?: 'checking' | 'not-authenticated' | 'authenticated'}
export type errorState= { errorMessage?: string | null}
export type AuthUserState = {
    uid?: string | null,
    email?: string | null,
    displayName?: string | null,
    photoURL?: string | null,
}
export type AuthState= statusState & AuthUserState & errorState;
export type StatusResponse = {ok:boolean};
export type AuthResult = AuthState & StatusResponse



const initialState: AuthState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthState>) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null
        },
        logout: (state, action: PayloadAction<AuthState| undefined> ) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = action.payload?.errorMessage??null
        },
        checkingCredencials: (state) => {
            state.status = 'checking'
        }
    }
})

export const { login, logout, checkingCredencials } = authSlice.actions