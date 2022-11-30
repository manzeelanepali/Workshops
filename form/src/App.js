import { useState, useEffect } from "react";
import Note from "./Components/Note";
// import axios from "axios";
import Footer from "./Components/Footer";
import notesService from "./services/notes";
import Notifications from "./Components/Notifications";
import loginService from "./services/login";
import Togglable from "./Components/Togglable";
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

  return <Togglable />;
};

export default App;
