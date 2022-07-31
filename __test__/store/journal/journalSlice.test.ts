
import { PayloadAction } from "@reduxjs/toolkit";
import { addNewEmptyNote, clearJournal, deleteNoteById, journalSlice, setActiveNote, setNotes, setSaving, updateImages, updateNote } from '../../../src/store/journal/journalSlice'
import { testInitialStateJournal, emptyNote, listNotes, journalTestWithInfo } from "../../fixtures/journalFixture";



describe('test journalSlice', () => {
    test('should return initial state', async () => {
        const storeInitialstate = journalSlice.getInitialState()
        const state = journalSlice.reducer(testInitialStateJournal, {} as PayloadAction);

        expect(storeInitialstate).toEqual(testInitialStateJournal)
        expect(state).toEqual(testInitialStateJournal)
        expect(journalSlice.name).toBe('journal')

    })

    test('should return saving state when setSaving is called', () => {
        const { isSaving, messageSaved } = journalSlice.reducer(testInitialStateJournal, setSaving())
        expect(isSaving).toBe(true)
        expect(messageSaved).toBe('')
    })

    test('should return state with new empty note in array inside store', () => {
        const { notes, isSaving } = journalSlice.reducer(testInitialStateJournal, addNewEmptyNote(emptyNote))

        expect(notes).toEqual([{ ...emptyNote, id: '' }])
        expect(isSaving).toBe(false)

    })

    test('should return state with new empty note in active note', () => {
        const { active, messageSaved } = journalSlice.reducer(testInitialStateJournal, setActiveNote({ ...emptyNote, id: '' }))

        expect(active).toEqual({ ...emptyNote, id: '' })
        expect(messageSaved).toBe('')

    })

    test('should load array of notes in store', () => {
        const state = journalSlice.reducer(testInitialStateJournal, setNotes(listNotes))

        expect(state.notes).toHaveLength(2);
        expect(state.notes).toEqual(expect.arrayContaining(listNotes));
    })


    test('should clean store', () => {

        const state = journalSlice.reducer(journalTestWithInfo, clearJournal())
        expect(state).toEqual(testInitialStateJournal)

    })

    test('should update note in array inside store',()=>{
        let {0:nota } = [...journalTestWithInfo.notes];
        nota.body.concat(' modificado');
        nota.title.concat(' modificado');
    
        const state = journalSlice.reducer(journalTestWithInfo, updateNote(nota))
        expect(state.notes[0]).toEqual(nota);
    })


    test('should delete note in array inside store',()=>{
        let {0:nota } = [...journalTestWithInfo.notes];
        const state = journalSlice.reducer(journalTestWithInfo, deleteNoteById(nota.id))
        expect(state.notes.length).toBe(1);
        expect(state.notes).not.toContainEqual(nota)
    })

    test('should update list image of the active note inside store',()=>{
        const images=['http://foto1.jpg','http://foto2.png']
        const {active} = journalSlice.reducer(journalTestWithInfo, updateImages(images))
        expect(active?.imageUrls ).toEqual(expect.arrayContaining(images))
    })





})