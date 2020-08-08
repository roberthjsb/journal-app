
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote, startLooadingNotes, startUploading, startSaveNote } from './../../actions/notes';
import { types } from './../../types/types';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helper/fileUpload';

//Arrange
const middlewares = [thunk];
let mockStore;
let store;

global.scrollTo = jest.fn();
jest.mock('../../helper/fileUpload',()=>({
    fileUpload: jest.fn(()=>{
        return 'http://loquesea.com/lacosa.png'
    })
}))


describe('Notes actions test', () => {
    beforeEach(() => {
        mockStore = configureStore(middlewares);
        store = mockStore({
            auth: {
                uid: 'testing'
            },
            notes: {
                        active: { id: '02Xg5YFlbG7tuQAHX0YX', title: 'prueba', body: '', date: 1595780320357 },
                    }
        });
    });
    it('should be create a new notes with startNewNote', async () => {
        //Action
        await store.dispatch(startNewNote());
        const actions = store.getActions();
        //Asserts
        expect(actions[0]).toEqual(
            {
                type: types.notesActive,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                }
            }
        );

        expect(actions[1]).toEqual(
            {
                type: types.notesAddNew,
                payload: {
                    id: expect.any(String),
                    title: '',
                    body: '',
                    date: expect.any(Number)
                }
            }
        );

        await db.doc(`testing/journal/notes/${actions[0].payload.id}`).delete();

    });


    it('should be loading notes with startLooadingNotes', async () => {
        //Action
        await store.dispatch(startLooadingNotes('testing'));
        const actions = store.getActions();
        //Asserts
        expect(actions[0]).toEqual(
            {
                type: types.noteLoad,
                payload: expect.any(Array)
            }
        );
    });

    it('should be updating note with startSaveNote', async () => {
        const updateNotes = {
            body: 'body',
            title: 'titulo',
            id: '02Xg5YFlbG7tuQAHX0YX'
        }
        //Action
        await store.dispatch(startSaveNote(updateNotes));
        const actions = store.getActions();
        //Asserts
        expect(actions[0].type).toBe(types.notesUpdated);
        const docRef = await db.doc(`testing/journal/notes/${updateNotes.id}`).get();
        expect(docRef.data().title).toBe(updateNotes.title)
        expect(docRef.data().body).toBe(updateNotes.body)
    });

    it('should be updating note with startUploading', async () => {
        //arrange

        const file = new File([], 'foto.png');
        //action
        await store.dispatch(startUploading(file))
        const docRef = await db.doc(`testing/journal/notes/02Xg5YFlbG7tuQAHX0YX`).get();
        //assert
        expect(docRef.data().url).toBe('http://loquesea.com/lacosa.png')

        });

});