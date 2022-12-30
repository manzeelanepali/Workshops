import { connect } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";
// import { useDispatch } from "react-redux";

const Notes = (props) => {
  // const dispatch= useDispatch();

  return (
    <div>
      <ul>
        {props.notes.map((note) => (
          <li key={note.id} onClick={() => props.toggleImportanceOf(note.id)}>
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === "ALL") {
    return {
      notes: state.notes,
    };
  }

  return {
    notes:
      state.filter === "IMPORTANT"
        ? state.notes.filter((note) => note.important)
        : state.notes.filter((note) => !note.important),
  };
};
const mapDispatchToProps = {
  toggleImportanceOf,
};

const ConnectedNotes = connect(mapStateToProps, mapDispatchToProps)(Notes);
export default ConnectedNotes;
