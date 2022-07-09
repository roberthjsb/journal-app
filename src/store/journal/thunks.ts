import { collection, doc, DocumentData, getDocs, QueryDocumentSnapshot, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from '../../firebase/config'
import { AppDispatch, RootState } from "../store"
import { addNewEmptyNote, JournalNote, setActiveNote, setNotes, setSaving } from "./journalSlice"


type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>



export const startNewNote = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const newNote: PartialBy<JournalNote, 'id'> = {
            body: '',
            title: '',
            date: new Date().getTime()
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