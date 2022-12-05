import React from "react";

const Note = ({ note, toggleImportance }) => {
  return (
    <>
      <li className="note">{note.content}</li>
      <button onClick={toggleImportance}>Change important</button>
    </>
  );
};

export default Note;
