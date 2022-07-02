import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type authState = {
    status: 'checking' | 'not-authenticated' | 'authenticated',
    uid: string | null,
    email: string | null,
    displayName: string | null,
    photoURL: string | null,
    errorMessage: string | null
}
const initialState: authState = {
    status: 'not-authenticated',
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
        login: (state, action: PayloadAction<authState>) => {
            state.status = 'authenticated';
            state.uid = action.payload.uid;
            state.email = action.payload.email;
            state.displayName = action.payload.displayName;
            state.photoURL = action.payload.photoURL;
            state.errorMessage = null
        },
        logout: (state, action: PayloadAction<authState>) => {
            state.status = 'not-authenticated';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = action.payload.errorMessage
        },
        checkingCredencials: (state) => {
            state.status = 'checking'
        }
    }
})

export const { login, logout, checkingCredencials } = authSlice.actions