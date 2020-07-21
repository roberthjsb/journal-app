import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
   const notesSnapshot = await db.collection(`${uid}/journal/notes`).get()
    const notes =[];
    notesSnapshot.forEach(snapshotNote =>{
        notes.push({
            id: snapshotNote.id,
            ...snapshotNote.data()
        });
    });
    return notes;
}
