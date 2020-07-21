import { db } from "../firebase/firebaseConfig";
import { types } from './../types/types';
import { loadNotes } from './../helper/loadNotes';
import Swal from 'sweetalert2'
import { fileUpload } from './../helper/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await db.collection(`${uid}/journal/notes`)
            .add(newNote);
        dispatch(activeNote(doc.id, newNote));
        dispatch(addNote(doc.id, newNote));

    }
}
export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
})

export const addNote = (id, note) => ({
    type: types.notesAddNew,
    payload: {
        id,
        ...note
    }
})

export const startLooadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}


export const setNotes = (notes) => ({
    type: types.noteLoad,
    payload: notes
});

export const startSaveNote = (note) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        debugger
        if (!note.url) {
            delete note.url;
        }
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;
        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch(refreshNote(note.id, noteToFirestore))
        Swal.fire('Saved', note.title, 'success');
    }
}

export const refreshNote = (id, note) => ({
    type: types.notesUpdated,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
})

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active } = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            onBeforeOpen:()=>{
                Swal.showLoading();
            }
        });
        const fileUrl = await fileUpload(file);
        active.url= fileUrl;
        dispatch(startSaveNote(active))
        Swal.close();

    }
}

export const startDeleting = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch(deleteNote(id));
    }
}

export const deleteNote = (id) => {
    return {
        type: types.noteDelete,
        payload: id
    }
}
export const notLogout = () => {
    return {
        type: types.noteLogoutCleaning
    }
}




