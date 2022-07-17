import { AuthError, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { AuthResult, AuthUserState, errorState, StatusResponse } from "../store";
import { FirebaseAuth } from "./config"

const googleProvider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider)
        const { displayName, email, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        } as AuthUserState & StatusResponse
    } catch (error) {
        const errorMessage = (<AuthError>error).code;
        return {
            ok: false,
            errorMessage
        } as AuthResult
    }
}
export const registerUserWithCredential = async ({ displayName, email, password }: { email: string, password: string, displayName: string }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;

        await updateProfile(FirebaseAuth.currentUser!, { displayName })
        return { ok: true, uid, photoURL, email, displayName } as AuthResult
    } catch (error) {
        const errorMessage = (<AuthError>error).code;
        return {
            ok: false,
            errorMessage
        } as AuthResult
    }
}


export const loginWithEmailAndPassword = async ({ email, password }: { email: string, password: string }) => {
    try {
        const result = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { displayName, photoURL, uid } = result.user;
        return {
            ok: true,
            displayName, email, photoURL, uid
        } as AuthResult
    } catch (error) {
        const errorMessage = (<AuthError>error).code;
        return {
            ok: false,
            errorMessage
        } as AuthResult
    }
}

export const logoutSession = async () => {
    try {
        await FirebaseAuth.signOut()
    } catch (error) {
        const errorMessage = (<AuthError>error).code;
        console.log(errorMessage)
    }
}


