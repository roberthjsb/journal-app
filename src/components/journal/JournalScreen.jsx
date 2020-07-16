import React from 'react'
import { SideBar } from './SideBar';
import { NoteScreen } from '../notes/NoteScreen';
// import { NothingSelected } from './NothingSelected';
export const JournalScreen = () => {
    return (
        <div className="journal__main-content">
            <SideBar/>
            <main>
                {/* <NothingSelected/> */}
                <NoteScreen/>
            </main>
        </div>
    )
}
