import { useState, useEffect, useRef } from "react";
import Note from "./Components/Note";
// import axios from "axios";
import Footer from "./Components/Footer";
import notesService from "./services/notes";
import Notifications from "./Components/Notifications";
import loginService from "./services/login";
import Togglable from "./Components/Togglable";
import LoginForm from "./Components/LoginForm";
import NoteForm from "./Components/NoteForm";
const App = () => {
  const noteFormRef = useRef();
  const [notes, setNotes] = useState([]);

  const [showAll, setShowALL] = useState(true);
  const [message, setErrorMessage] = useState("sample Message");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    // axios.get("  http://localhost:3001/notes")
    notesService.getAll().then((result) => {
      setNotes(result);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      notesService.setToken(user.token);
    }
  }, []);

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const addNote = (noteObject) => {
    noteFormRef.current.toggleVisibility();

    notesService.create(noteObject).then((returnedNote) => {
      setNotes(notes.concat(returnedNote));
      noteFormRef.current.toggleVisibility();
    });
    console.log("addNotes rn ", addNote);
  };
  console.log("addNotes", addNote);
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      notesService.setToken(user.token);
      setUser(user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  );

  const noteForm = () => (
    <Togglable buttonLabel="create new note " ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  return (
    <div>
      <h1>Notes details</h1>
      <Notifications message={message} />
      {/* {user === null ? loginForm() : noteForm()} */}
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged-in</p>
          {noteForm()}
        </div>
      )}
      <button onClick={() => setShowALL(!showAll)}>
        show {showAll ? "important" : "all"}
      </button>
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
                // eslint-disable-next-line no-unused-vars
                .catch((error) => {
                  // console.log("caught the error ");
                  setErrorMessage("This note doesnot exist anymore");
                  setErrorMessage("This note doesnot exist anymore");
                  setTimeout(() => setErrorMessage(null), 2000);
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
      {/* <form onSubmit={addNotes}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save </button>
      </form> */}
      <Footer />
    </div>
  );
};
export default App;
