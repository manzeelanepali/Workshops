import React from 'react'

const Note = ({note}) => {
  
  return (
    <li>{note.content}({note.important.toString()})<button>Change  importance </button></li>
  )
}

export default Note