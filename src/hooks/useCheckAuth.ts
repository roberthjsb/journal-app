import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect } from 'react'
import { FirebaseAuth } from '../firebase/config';
import { useAppSelector, useAppDispatch, logout, login } from '../store';
import { startLoadingNote } from '../store/journal/thunks';

export const useCheckAuth = () => {
    const { status } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
  
    useEffect(() => {
      onAuthStateChanged(
        FirebaseAuth,
        (user) => {
          if (!user) return dispatch(logout());
          const { displayName, email, photoURL, uid } = user;//evita warning: redux
  
          dispatch(login({ displayName, email, photoURL, uid }));
          dispatch(startLoadingNote())
        }
      );
    }, []);

    return {
        status
    }
    
}
