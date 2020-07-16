import React from 'react'
import { NoteAppBar } from './NoteAppBar';

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NoteAppBar/>
            <div className="notes__content">
                <input 
                    type="text" 
                    placeholder="Some awesome title"
                    className="notes__title-input"
                />
                <textarea
                    placeholder="What happened today?"
                    className="notes__textarea"                
                ></textarea>
                <div className="notes__image">
                    <img 
                        src="https://cdn.pixabay.com/photo/2016/03/27/18/54/technology-1283624_960_720.jpg" 
                        alt="code"/>
                </div>
            </div>
        </div>
    )
}
