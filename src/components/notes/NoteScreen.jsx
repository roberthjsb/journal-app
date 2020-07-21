import React, { useRef, useEffect } from "react";
import { NoteAppBar } from "./NoteAppBar";
import { useSelector } from "react-redux";
import { useForm } from "./../../hooks/useForm";
import { useDispatch } from "react-redux";
import { activeNote, startDeleting } from "../../actions/notes";

export const NoteScreen = () => {
  const note = useSelector((state) => state.notes.active);
  const dispatch = useDispatch();
  const [formValues, handleInputChange, reset] = useForm(note);
  const { title, body } = formValues;

  const activeID = useRef(note.id);

  useEffect(() => {
    if (activeID.current != note.id) {
      reset(note);
      activeID.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    console.log("activeNote....");
    dispatch(activeNote(formValues.id, { ...formValues }));
  }, [formValues, dispatch]);
  const handleDeleteNote = (id) => {
      dispatch(startDeleting(id));
  }
  

  return (
    <div className="notes__main-content">
      <NoteAppBar />
      <div className="notes__content">
        <input
          type="text"
          placeholder="Some awesome title"
          className="notes__title-input"
          value={title}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          placeholder="What happened today?"
          className="notes__textarea"
          value={body}
          name="body"
          onChange={handleInputChange}></textarea>

        {note.url && (
          <div className="notes__image">
            <img src={note.url} alt="code" />
          </div>
        )}
        <button 
            className="btn btn-block btn-danger"
        onClick={()=>handleDeleteNote(note.id)}
        >Delete</button>
      </div>
    </div>
  );
};
