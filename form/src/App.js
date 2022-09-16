import { useState, useEffect } from "react";
import Note from "./Components/Note";
// import axios from "axios";
import Footer from "./Components/Footer";
import notesService from "./services/notes";
import Notifications from "./Components/Notifications";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
  const [showAll, setShowALL] = useState(true);

  useEffect(() => {
    // axios.get("  http://localhost:3001/notes")
    notesService.getAll().then((result) => {
      setNotes(result);
    });
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNotes = (event) => {
    // prevent default -> console ma few seconds pachi afai ease huncha input gareko value so tyo remove garna ko laghi preventDefault method use huncha
    event.preventDefault();
    // console.log("buttonclicked",event.target)
    const newObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };
    notesService.create(newObject).then((response) => {
      // console.log(response.data);
      setNotes(notes.concat(newObject));
      setNewNote("");
    });
  };
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notifications message="This is a message " />
      <div>
        <div>
          <button onClick={() => setShowALL(!showAll)}>
            show {showAll ? "important" : "all"}
          </button>
        </div>
      </div>
      <ul>
        {/* {notes.map(note => 
          <Note key={note.id} note={note} />

        )} */}

        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            const
            toggleImportance={() => {
              console.log(
                `Button is clicked bu function passsed from App for id ${note.id}`
              );
              // points for updating the value in the backend only
              // 1. Make new object from current note with toggled important field
              const updatedNotes = { ...note, important: !note.important };
              // axios
              notesService
                .update(note.id, updatedNotes)
                .then((response) => {
                  setNotes(notes.map((x) => (x.id !== note.id ? x : response)));
                  // setNotes(notes.concat(updatedNotes));
                  // setNewNote("");
                })
                .catch((error) => {
                  console.log("caught the error ");
                });
              // }
              //   // 2. update backend server with the updated object
              //   .put(`http://localhost:3001/notes/${note.id}`, updatedNotes)
              //   .then((response) => {
              //     console.log(response.data);
              //     // 3. put  for updating the frontend state with the updated note
              //     setNotes(
              //       notes.map((x) => (x.id !== note.id ? x : response.data))
              //     );
              //     // setNotes(notes.concat(newObject));
              //     // setNewNote("");
              //   });
            }}
          />
        ))}
      </ul>

      <form onSubmit={addNotes}>
        <input value={newNote} onChange={handleNoteChange} />

        <button type="submit">save </button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
