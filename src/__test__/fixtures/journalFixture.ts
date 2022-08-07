
import { Journal, JournalNote, PartialBy } from "../../types/journal.type";



export const testInitialStateJournal: Journal = {
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
};

export const emptyNote: PartialBy<JournalNote, 'id'> = {
    title: '',
    body: '',
    imageUrls: [],
}

export const listNotes: JournalNote[]=[
    {
        id:'abcd123',
        body:'esto es la prueba 01',
        imageUrls:[],
        title:'prueba 01',
        date:123456
    },
    {
        id:'zxy987',
        body:'esto es la prueba 02',
        imageUrls:['http://my-foto.gif'],
        title:'prueba 02',
        date:86540
    },
]

export const journalTestWithInfo:Journal={
    active: listNotes[1],
    isSaving:false,
    messageSaved:'',
    notes:[...listNotes]
}