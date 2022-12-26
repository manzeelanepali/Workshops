import React  from "react";
import NewNote from "./components/NewNote";
import Notes from "./components/Notes"
// import { useSelector,useDispatch } from "react-redux"

const App = () => {
  const filterSelected = (value) => {
    console.log(value)
  }





 return(
      <div>
          <NewNote/>
          <div>
        all          <input type="radio" name="filter"
          onChange={() => filterSelected('ALL')} />
        important    <input type="radio" name="filter"
          onChange={() => filterSelected('IMPORTANT')} />
        nonimportant <input type="radio" name="filter"
          onChange={() => filterSelected('NONIMPORTANT')} />
      </div>
    
     



        <Notes/>
          
    </div>
 )
}

  export default App;