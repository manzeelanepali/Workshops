


import { useState } from 'react'
import Note from './Components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  
  const addNotes =(event)=>{
    event.preventDefault()
    console.log("buttonclicked",event.target)
  }


  return ( 
    <div>  
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      
      
    <form onSubmit={addNotes}>
        <button type="submit">click me </button>
        <input />
        </form>
    </div>
  )
}

export default App  