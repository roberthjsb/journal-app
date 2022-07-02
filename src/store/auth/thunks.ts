import { signInWithGoogle } from "../../firebase/providers";
import { AppDispatch } from "../store";
import { checkingCredencials, login, logout } from "./authSlice";

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
        if (!result.ok) return dispatch(logout(result))
        dispatch(login(result))
    }
}