import React from "react";

const Note = ({ note, toggleImportance }) => {
  return (
    <li>
      {note.content}({note.important.toString()})
      <button onClick={toggleImportance}>Change importance </button>
    </li>
  );
};

export default Note;
