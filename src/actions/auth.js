import { types } from './../types/types';
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { startLoading, finishLoading } from './ui';
import Swal from 'sweetalert2';
import { notLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading())
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))                
            })
            .catch(e => {
                Swal.fire('Error',e.message,'error')
            })
            .finally(()=>dispatch(finishLoading()))
    }
}

export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then(({ user }) => {
                dispatch(login(user.uid, user.displayName))
            })
    }
}

export const registerWithEmailAndPassword = (email, password, name) => {
    return (dispatch) => {
        firebase.auth().createUserWithEmailAndPassword(email, password.toString())
            .then(async ({ user }) => {
                await user.updateProfile({ displayName: name });
                dispatch(login(user.uid, user.displayName));
            }).catch(e => console.log(e))
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: { uid, displayName }
})
export const startLogout = () => {
    return async  (dispatch)=>{
        await firebase.auth().signOut()
        dispatch(logout())
        dispatch(notLogout())
    }
}

export const logout = () => ({
    type: types.logout,
})
