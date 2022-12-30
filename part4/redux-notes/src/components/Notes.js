import { connect } from 'react-redux'
import { toggleImportanceOf } from "../reducers/noteReducer";
// import { useSelector,useDispatch } from "react-redux";
import { useDispatch } from "react-redux";




const Notes =(props)=>{
const dispatch= useDispatch();



    // const notesToShow = () => {
    //   if ( props.filter === 'ALL' ) {
    //     return props.notes
    //   }
      
    //   return props.filter  === 'IMPORTANT'
    //     ? props.notes.filter(note => note.important)
    //     : props.notes.filter(note => !note.important)
    // }





return (
  <div>
    <ul>
    {props.notes.map((note) => (
          <li
            key={note.id}
            onClick={() => dispatch(toggleImportanceOf(note.id))}
          >
            {note.content} <strong>{note.important ? "important" : ""}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};



const mapStateToProps = (state) => {
  if ( state.filter === 'ALL' ) {
    return {
      notes: state.notes
    }
  }

  return {
    notes: (state.filter  === 'IMPORTANT' 
      ? state.notes.filter(note => note.important)
      : state.notes.filter(note => !note.important)
    )
  }
}
  




const ConnectedNotes = connect(mapStateToProps)(Notes)
    export default ConnectedNotes;