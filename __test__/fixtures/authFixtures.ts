import { AuthState, AuthUserState } from "../../src/store/auth/authSlice"

export const initialState: AuthState = {
    status: 'checking',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const authenticatedState: AuthState = {
    status: 'authenticated',
    uid: '385848343',
    email: 'prueba@prueba.com',
    displayName: 'testuser',
    photoURL: 'http://fotos/foto.jpg',
    errorMessage: null
}

export const notAuthenticatedState: AuthState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null
}

export const notAuthenticatedWithState: AuthState = {
    status: 'not-authenticated',
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: "Credenciales no son correctas"
}

export const testUser:AuthUserState={
    uid: '385848343',
    email: 'prueba@prueba.com',
    displayName: 'testuser',
    photoURL: 'http://fotos/foto.jpg',
}