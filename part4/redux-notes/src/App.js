import React  from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes"
// import { useSelector,useDispatch } from "react-redux"

const App = () => {
 return(
      <div>
        <Notes/>
          <NewNote/>
          
    </div>
 )
}

  export default App;