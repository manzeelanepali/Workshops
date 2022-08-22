


import { useState } from 'react'
import Note from './Components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote,setNewwNote]= useState("a new note")

  
  const addNotes =(event)=>{
    // prevent default -> console ma few seconds pachi afai ease huncha input gareko value so tyo remove garna ko laghi preventDefault method use huncha 
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
      <input value ={newNote}/>

        <button type="submit">save </button>
        
        </form>
    </div>
  )
}

export default App  