


import { useState } from 'react'
import Note from './Components/Note'

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote,setNewNote]= useState("a new note")
  const [ showAll, setShowALL]= useState(true)

  const notesToShow = showAll 
  ?notes 
  : notes.filter (note=> note.important ===true)

   

  
  const addNotes =(event)=>{
    // prevent default -> console ma few seconds pachi afai ease huncha input gareko value so tyo remove garna ko laghi preventDefault method use huncha 
    event.preventDefault()
    // console.log("buttonclicked",event.target)
    const newObject ={
      content : newNote,
      date : new Date().toISOString(),
      important : Math.random()< 0.5,
      id : notes.length + 1,
    }
    setNotes(notes.concat(newObject))
    setNewNote("")
  }
  const handleNoteChange=(event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }
  
  return ( 
    <div>  
      <h1>Notes</h1>
      <div>
      <div>
        <button onClick={() =>  setShowALL(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div>
      </div>
      <ul>
        {/* {notes.map(note => 
          <Note key={note.id} note={note} />

        )} */}

        {notesToShow.map(note => <Note key={note.id} note={note} />)}
        

      </ul>
      
      
    <form onSubmit={addNotes}>
      <input value ={newNote}
      onChange={handleNoteChange}/>

        <button type="submit">save </button>
        
        </form>
    </div>
  )
}

export default App  