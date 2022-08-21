


import { useState } from 'react'
import Note from './Components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  console.log(notes)


  return ( 
    <div>  
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>
      
    {/* <form>
        <button>click me </button>
        <input />
        </form> */}
    </div>
  )
}

export default App  