import { collection, doc, DocumentData, deleteDoc, getDocs, QueryDocumentSnapshot, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from '../../firebase/config'
import { fileUpload } from "../../services/fileUpload";

import { JournalNote, PartialBy } from "../../types/journal.type";
import { login, logout } from "../auth/authSlice";
import { AppDispatch, RootState } from "../store"
import { addNewEmptyNote, deleteNoteById, setActiveNote, setNotes, setSaving, updateImages, updateNote } from "./journalSlice"





export const startNewNote = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const newNote: PartialBy<JournalNote, 'id'> = {
            body: '',
            title: '',
            date: new Date().getTime(),
            imageUrls: []

        }
        dispatch(setSaving());

        const { uid } = getState().auth;
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))
        await setDoc(newDoc, newNote)
        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote as JournalNote))
        dispatch(setActiveNote(newNote as JournalNote))

    }
}


export const startUpdateNote = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setSaving())
        const { uid } = getState().auth;

        const { active: activeNote } = getState().journal;

        const { id, ...noteToFireStore } = { ...activeNote }
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);

        await setDoc(docRef, noteToFireStore, { merge: true })
        dispatch(updateNote(activeNote!))

    }
}

export const startDeleteNote = (id?: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        if (!id) return;
        const { uid } = getState().auth;
        dispatch(setSaving())
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
        await deleteDoc(docRef)
        dispatch(deleteNoteById(id))

    }
}


export const startLoadingNote = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {

        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');

        const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
        const docs = await getDocs(collectionRef);

        const notes = [] as JournalNote[];
        docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            notes.push({
                id: doc.id,
                ...doc.data() as Omit<JournalNote, 'id'>
            });
        });

        dispatch(setNotes(notes))
    }
}

export const startUploadingFile = (files: File[]) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch(setSaving())
        const promisesUpload = files.map(f => fileUpload(f))
        const respUrls = (await Promise.all(promisesUpload))
            .map(f => f ?? '')
            .filter(f => f.length > 0)

        dispatch(updateImages(respUrls))
    }
}


export const onChangeUser = (user:any) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        if (!user) return dispatch(logout());
        
        const { displayName, email, photoURL, uid } = user;//evita warning: redux
        dispatch(login({ displayName, email, photoURL, uid }));
        dispatch(startLoadingNote())
    }
}