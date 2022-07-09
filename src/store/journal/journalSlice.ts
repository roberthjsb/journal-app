import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Journal = {
    isSaving: boolean,
    messageSaved: string,
    notes: JournalNote[],
    active: JournalNote | null
}
export type JournalNote = {
    id: string,
    title: string,
    body: string,
    date?: number,
    imageUrls?: string[]
}

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
        },
        addNewEmptyNote: (state, action: PayloadAction<JournalNote>) => {
            state.notes = [...state.notes, action.payload]
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<JournalNote>) => {
            state.active = {...action.payload};
        },
        setNotes: (state, action: PayloadAction<JournalNote[]>) => {
            state.notes = action.payload
        },
        updateNote: (state, action) => { },
        deleteNoteById: (state, action) => { },

    }
})


export const {
    addNewEmptyNote,
    setActiveNote,
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById } = journalSlice.actions