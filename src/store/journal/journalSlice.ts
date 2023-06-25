import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Journal, JournalNote, PartialBy } from "../../types";

const initialState: Journal = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}

export const journalSlice = createSlice({
    name: 'journal',
    initialState,
    reducers: {
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = ''
        },
        addNewEmptyNote: (state, action: PayloadAction<PartialBy<JournalNote, 'id'>>) => {
            state.notes = [...state.notes, { ...action.payload, id: '' }]
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<JournalNote>) => {
            state.active = { ...action.payload };
            state.messageSaved = '';
        },
        setNotes: (state, action: PayloadAction<JournalNote[]>) => {
            state.notes = action.payload
        },
        updateNote: (state, action: PayloadAction<JournalNote>) => {
            state.notes = state.notes.map(
                note => {
                    return note.id !== action.payload.id ? note : action.payload;
                }
            )
            state.isSaving = false;
            state.messageSaved = `${state.active?.title}, actualizada correctamente`
        },
        updateImages: (state, action: PayloadAction<string[]>) => {
            
            if (state.active)
                state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false;
        },
        clearJournal: (state) => {
            state.isSaving = false;
            state.messageSaved = ''
            state.active = null;
            state.notes = [];
        },
        deleteNoteById: (state, action: PayloadAction<string>) => {
            state.notes = state.notes.filter(note => note.id !== action.payload)
            state.active = null;
        },

    }
})


export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    updateImages,
    clearJournal,
    deleteNoteById } = journalSlice.actions