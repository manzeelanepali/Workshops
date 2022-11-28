import { useState, useEffect } from "react";
import Note from "./Components/Note";
// import axios from "axios";
import Footer from "./Components/Footer";
import notesService from "./services/notes";
import Notifications from "./Components/Notifications";
import loginService from "./services/login";
const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note");
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
    notesService
      .create(newObject)
      .then((response) => {
        // console.log(response.data);
        setNotes(notes.concat(newObject));
        setNewNote("");
      })
      .catch((error) => {
        console.log(error);
        console.dir(error);
        setErrorMessage(error.response.data.error);
        setTimeout(() => {}, 2000);
      });
  };
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

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
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  );

  const noteForm = () => (
    <form onSubmit={addNotes}>
      <input value={newNote} onChange={handleNoteChange} />

      <button type="submit">save </button>
    </form>
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
