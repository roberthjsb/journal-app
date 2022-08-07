import { onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react'
import { FirebaseAuth } from '../firebase/config';
import { useAppSelector, useAppDispatch, logout, login } from '../store';
import { onChangeUser, startLoadingNote } from '../store/journal/thunks';

export const useCheckAuth = () => {
  const { status } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    return onAuthStateChanged(FirebaseAuth, (user) => {
      return dispatch(onChangeUser(user));
    });
  }, []);

  return { status }

}
