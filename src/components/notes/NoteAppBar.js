import React, { useRef } from 'react'
import { useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const NoteAppBar = () => {
    const dispatch = useDispatch()
    const {active}=useSelector(state => state.notes);
    const fileRef = useRef(null);


    const handleSave = ()=>{
        dispatch(startSaveNote(active));
    }
    const handlePictureClick = (params) => {
        fileRef.current.click();
    }
    const handleFileChange = (e) => {
        const file =e.target.files[0];
        if(file){
            dispatch(startUploading(file));
        }
    }

    
    return (
        <div className="notes__appbar">
            <span>{moment().format('DD-MMM-yyyy')}</span>
            <input 
            ref={fileRef}
                type="file"
                name="file"
                style={{display:'none'}}
                onChange={handleFileChange}
            />
            <div>
                <button className="btn"
                onClick={handlePictureClick}
                >
                    Picture
                </button>
                <button className="btn"
                    onClick={handleSave}
                >
                    Save
                </button>
            </div>
        </div>
    )
}
