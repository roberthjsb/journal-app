import React from "react";
import moment from "moment";
import { activeNote } from "../../actions/notes";
import { useDispatch } from "react-redux";

export const JournalEntry = ({ id, title, body, date, url }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleEntryClick = (id) => {
    dispatch(activeNote(id, { id, title, body, date, url }));
  };

  return (
    <div className="journal__entry" onClick={() => handleEntryClick(id)}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: "cover",
            backgroundImage: `url(${url})`,
          }}></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title"> {title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>
      <div className="journal__entry-date-box">
        <p>{noteDate.format('dddd')}</p>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  );
};
