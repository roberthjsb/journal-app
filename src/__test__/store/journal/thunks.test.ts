import { startDeleteNote, startLoadingNote, startNewNote, startUpdateNote, startUploadingFile } from '../../../store/journal/thunks'
import { journalTestWithInfo, listNotes, testInitialStateJournal } from '../../fixtures/journalFixture'
import * as modMocked from 'firebase/firestore/lite'
import * as mockFile from '../../../services/fileUpload'
import { Mock, vi } from 'vitest'



vi.mock('../../../services/fileUpload.ts')
vi.mock("../../../firebase/providers")
vi.mock("firebase/firestore/lite")
describe('journal thunks', () => {
    const dispatch = vi.fn();
    const getState = vi.fn();
    const doc = modMocked.doc as Mock;
    const deleteDoc = modMocked.deleteDoc as Mock;
    const getDocs = modMocked.getDocs as Mock;


 





    beforeEach(() => {
        vi.clearAllMocks();
    })

    test('should call setSaving, addNewEmptyNote and setActiveNote when called startNewNote', async () => {
        doc.mockReturnValue({ id: '123456abc' })
        getState.mockReturnValue({ auth: { uid: 'abcd1234' } })
        await startNewNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ "type": "journal/setSaving" })
        expect(dispatch).toHaveBeenCalledWith({ "type": "journal/addNewEmptyNote", "payload": { "body": "", "title": "", "date": expect.anything(), "imageUrls": [], "id": "123456abc" } })
        expect(dispatch).toHaveBeenCalledWith({ "type": "journal/setActiveNote", "payload": { "body": "", "title": "", "date": expect.anything(), "imageUrls": [], "id": "123456abc" } })

    })

    test('should call setSaving and updateNote when called startUpdateNote', async () => {
        doc.mockReturnValue({ id: '123456abc' })
        getState.mockReturnValue({ auth: { uid: 'abcd1234' }, journal: journalTestWithInfo })
        await startUpdateNote()(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ "type": "journal/setSaving" })
        expect(dispatch).toHaveBeenCalledWith({ type: 'journal/updateNote', payload: journalTestWithInfo.active })

    })

    test('should call setSaving and deleteNoteById when called startDeleteNote', async () => {
        doc.mockReturnValue({ id: '123456abc' })
        getState.mockReturnValue({ auth: { uid: 'abcd1234' }, journal: journalTestWithInfo })
        const { id } = journalTestWithInfo.active ?? {}
        await startDeleteNote(id)(dispatch, getState)

        expect(dispatch).toHaveBeenCalledWith({ type: 'journal/setSaving' })
        expect(dispatch).toHaveBeenCalledWith({ type: 'journal/deleteNoteById', payload: journalTestWithInfo.active?.id })
        expect(doc).toHaveBeenCalledTimes(1)
        expect(deleteDoc).toHaveBeenCalledTimes(1)

    })

    test('should not call setSaving and deleteNoteById when called startDeleteNote without id', async () => {
        doc.mockReturnValue({ id: '123456abc' })
        getState.mockReturnValue({ auth: { uid: 'abcd1234' }, journal: journalTestWithInfo })
        await startDeleteNote()(dispatch, getState)

        expect(dispatch).not.toHaveBeenCalledWith({ type: 'journal/setSaving' })
        expect(dispatch).not.toHaveBeenCalledWith({ type: 'journal/deleteNoteById', payload: journalTestWithInfo.active?.id })

        expect(doc).toHaveBeenCalledTimes(0)
        expect(deleteDoc).toHaveBeenCalledTimes(0)

    })


    test('should call setSaving and updateImages and upload 2 images', async () => {
        const mockfileUpload = mockFile.fileUpload as Mock;
        mockfileUpload
            .mockResolvedValueOnce('http://foto1.abc.jpg')
            .mockResolvedValueOnce('http://foto2.abc.jpg')

        const file = new File([new ArrayBuffer(1)], 'file.jpg');
        const file2 = new File([new ArrayBuffer(1)], 'file2.jpg');


        await startUploadingFile([file, file2] as File[])(dispatch, getState)

        expect(mockfileUpload).toHaveBeenCalledTimes(2);
        expect(dispatch).toHaveBeenCalledWith({ type: 'journal/setSaving' })
        expect(dispatch).toHaveBeenCalledWith({ "type": "journal/updateImages", "payload": ["http://foto1.abc.jpg", "http://foto2.abc.jpg"] })

    })


    test('should call setNotes with dispatch, get notes and save in store ', async () => {
        doc.mockReturnValue({ id: '123456abc' })
        const mockDocList = vi.fn()
        .mockImplementation((l)=>({
            id:expect.any(String),
            data:vi.fn().mockReturnValue(l)
        }))
        getDocs.mockResolvedValue(listNotes.map(l=> mockDocList(l)))

        await startLoadingNote()(dispatch, getState)

       expect(dispatch).toHaveBeenCalledWith({ type: 'journal/setNotes', payload: listNotes })
       expect(getDocs).toBeCalledTimes(1);
       expect(mockDocList).toHaveBeenCalledTimes(2)
       expect(mockDocList).toHaveBeenNthCalledWith(1,listNotes[0])
       expect(mockDocList).toHaveBeenNthCalledWith(2,listNotes[1])
       

    })

    test ('should throw error in starLoadingNote when uid user not exists ',async ()=>{
        getState.mockReturnValue({auth:{}})
       await expect(startLoadingNote()(dispatch, getState)).rejects.toThrowError('El UID del usuario no existe')
    })

})