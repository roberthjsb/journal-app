import { async } from "@firebase/util";
import { loginWithEmailAndPassword, logoutSession, registerUserWithCredential, signInWithGoogle } from "../../firebase/providers";
import { AppDispatch } from "../store";
import { AuthState, checkingCredencials, login, logout } from "./authSlice";

export const checkingAuthentication = (email: string, password: string) => {
    console.log(email, password)
    return async (dispatch: AppDispatch) => {
        dispatch(checkingCredencials());
    }
}

export const startGoogleSignIn = () => {
    return async (dispatch: AppDispatch) => {
        dispatch(checkingCredencials());

        const result = await signInWithGoogle();

        if (!result.ok) return dispatch(logout(result as AuthState))
        dispatch(login(result))
    }
}

export const startRegisterUserWithCredential = (credencial: { email: string, password: string, displayName: string }) => {
    return async (dispatch: AppDispatch) => {
        dispatch(checkingCredencials());
        const { ok, ...authInformation } = await registerUserWithCredential(credencial)
        if (!ok) return dispatch(logout(authInformation))
        dispatch(login(credencial))
    }
}


export const startLoginUserWithEmailAndPassword = (credencial: { email: string, password: string }) => {
    return async (dispatch: AppDispatch) => {

        dispatch(checkingCredencials());
        const { ok, ...authInformation } = await loginWithEmailAndPassword(credencial);
        if (!ok) return dispatch(logout(authInformation as AuthState))
        dispatch(login(authInformation))
    }
}

export const StartLogut = () => {
    return async (dispatch: AppDispatch) => {
        await logoutSession();
        dispatch(logout());
    }
}



