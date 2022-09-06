import React from 'react'

const Note = ({note}) => {
  const  clickFunc=()=>{
    console.log("Button is clicked ")

  }
  
  return (
    <li>{note.content}({note.important.toString()})<button onClick={clickFunc}>Change  importance </button></li>
  )
}

export default Note